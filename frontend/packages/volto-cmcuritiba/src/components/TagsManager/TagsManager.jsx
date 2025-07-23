import React, { useEffect, useState } from 'react';
import { List, Message, Segment, Header, Loader } from 'semantic-ui-react';

const SEARCH_API = '/++api++/search?metadata_fields=Subject&b_size=1000';

const TagsManager = () => {
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTags = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(SEARCH_API, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('Erro ao buscar tags');
      const data = await res.json();
      // Coletar todos os valores de Subject
      const allSubjects = (data.items || []).flatMap(item => item.Subject || []);
      // Remover duplicados e ordenar
      const uniqueSubjects = Array.from(new Set(allSubjects)).sort();
      setKeywords(uniqueSubjects);
    } catch (e) {
      setError('Erro ao buscar tags');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <Segment padded>
      <Header as="h2">Gerenciador de Tags</Header>
      {loading && <Loader active inline="centered" />}
      {error && <Message negative>{error}</Message>}
      <List divided relaxed>
        {keywords.map((tag) => (
          <List.Item key={tag} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ flex: 1 }}>{tag}</span>
          </List.Item>
        ))}
      </List>
      <Message info>
        Para criar, editar ou excluir tags, utilize o campo "Assuntos" (Subjects) ao editar conteúdos no Plone.
      </Message>
    </Segment>
  );
};

export default TagsManager; 