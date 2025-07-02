import React, { useEffect, useState } from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import './style.less';
import { Link } from 'react-router-dom';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { Container, Typography, Button, Stack } from '@mui/material';
import { searchContent } from '@plone/volto/actions';
import { useDispatch, useSelector } from 'react-redux';

const Image = config.getComponent({ name: 'Image' }).component;

interface NewsItem {
  url: string;
  title: string;
  image_scales?: {
    image: Array<{
      download: string;
    }>;
  };
  editoria?: {
    title: string;
    cor_fundo: string;
    '@id': string;
  };
  subjects?: string[];
}

interface ViewProps {
  content: {
    items: NewsItem[];
  };
  data: {
    defaultFilter?: string;
    selectedEditorias?: Array<{
      editoria: {
        '@id': string;
      };
    }>;
    selectedTags?: string[];
  };
}

const PAGE_SIZE = 5;

const View: React.FC<ViewProps> = (props) => {
  const { content, data } = props;
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState<string>(
    data.defaultFilter || 'all',
  );
  const [currentPage, setCurrentPage] = useState<number>(0);

  const search = useSelector((state) => state.search.subrequests.newsSearch);
  const items = search?.items || [];
  const total = search?.total || 0;

  const totalPages = Math.ceil(total / PAGE_SIZE);

  useEffect(() => {
    dispatch(
      searchContent(
        '/',
        {
          portal_type: 'News Item',
          review_state: 'published',
          sort_on: 'effective',
          sort_order: 'descending',
          b_start: currentPage * PAGE_SIZE,
          b_size: PAGE_SIZE,
        },
        'newsSearch',
      ),
    );
  }, [dispatch, currentPage]);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev));
  };

  return (
    <div className="stack gap-24 max-w-100 py-32">
      <Container>
        <div className="flex justify-between align-items-center flex-mb flex-column-mb gap-24">
          <h2 className="title-back mb-0">Todas as notícias</h2>
        </div>
        <div className="itens mt-30 stack gap-30">
          {items.length > 0 ? (
            items.map((item: NewsItem, index: number) => (
              <Link
                key={index}
                className="item card-default py-24 px-24"
                to={item['@id']}
              >
                <div className="flex gap-32 align-items-center flex-mb flex-column-mb">
                  <div className="thumbnail m-w-218">
                    <img
                      src={
                        flattenToAppURL(
                          item['@id'] +
                            '/' +
                            item.image_scales?.image[0]?.download,
                        ) || '/images/news/default.png'
                      }
                      alt=""
                    />
                  </div>
                  <div className="content stack flex-1">
                    <div className="flex flex-start">
                      {item.editoria && (
                        <span
                          className="tag-color inline-block"
                          style={{ backgroundColor: item.editoria.cor_fundo }}
                        >
                          {item.editoria.title}
                        </span>
                      )}
                    </div>
                    <div className="mt-18">
                      <h3 className="title-24 mt-0">{item?.title}</h3>
                    </div>
                    {item.subjects && item.subjects.length > 0 && (
                      <div className="mt-14">
                        <Typography variant="body2" color="textSecondary">
                          Tags: {item.subjects.join(', ')}
                        </Typography>
                      </div>
                    )}
                    <div className="mt-14">
                      <span className="leia-mais">
                        Leia mais
                        <img src="/icons/leia-mais.svg" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <Typography variant="body1" className="text-center">
              Nenhuma notícia disponível.
            </Typography>
          )}
        </div>

        {/* Paginação */}
        {total > PAGE_SIZE && (
          <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentPage === 0}
            >
              Anterior
            </Button>
            <Typography variant="body2" alignSelf="center">
              Página {currentPage + 1} de {totalPages}
            </Typography>
            <Button
              variant="outlined"
              onClick={handleNext}
              disabled={currentPage + 1 >= totalPages}
            >
              Próxima
            </Button>
          </Stack>
        )}
      </Container>
    </div>
  );
};

export default withBlockExtensions(View);
