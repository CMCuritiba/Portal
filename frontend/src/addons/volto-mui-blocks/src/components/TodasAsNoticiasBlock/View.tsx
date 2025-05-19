import React, {useEffect, useState} from "react";
import {withBlockExtensions} from "@plone/volto/helpers";
import config from "@plone/volto/registry";
import "./style.less";
import {Link} from "react-router-dom";
import {flattenToAppURL} from "@plone/volto/helpers/Url/Url";
import {Button, ButtonGroup, Container, Typography} from "@mui/material";

const Image = config.getComponent({name: "Image"}).component;

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

const View: React.FC<ViewProps> = (props) => {
    const {content, data} = props;
    const items = content?.items || [];
    const [filteredItems, setFilteredItems] = useState<NewsItem[]>(items);
    const [activeFilter, setActiveFilter] = useState<string>(data.defaultFilter || 'all');

    useEffect(() => {
        setFilteredItems(items);
        setActiveFilter(data.defaultFilter || 'all');
    }, [items, data.defaultFilter]);

    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter);
        if (filter === 'all') {
            setFilteredItems(items);
        } else if (filter === 'editorias') {
            // Filtra itens que têm editoria selecionada
            const itemsWithEditoria = items.filter(item => {
                if (!item.editoria) return false;
                if (!data.selectedEditorias?.length) return true;
                return data.selectedEditorias.some(selected => 
                    selected.editoria['@id'] === item.editoria['@id']
                );
            });
            setFilteredItems(itemsWithEditoria);
        } else if (filter === 'tags') {
            // Filtra itens que têm tags selecionadas
            const itemsWithTags = items.filter(item => {
                if (!item.subjects?.length) return false;
                if (!data.selectedTags?.length) return true;
                return item.subjects.some(tag => data.selectedTags?.includes(tag));
            });
            setFilteredItems(itemsWithTags);
        }
    };

    return (
        <div className="stack gap-24 max-w-100 py-32">
            <Container>
                <div className="flex justify-between align-items-center flex-mb flex-column-mb gap-24">
                    <h2 className="title-back mb-0">Todas as notícias</h2>
                    <ButtonGroup variant="contained" aria-label="filtro de notícias">
                        <Button 
                            onClick={() => handleFilterChange('all')}
                            className={activeFilter === 'all' ? 'active' : ''}
                        >
                            Todas
                        </Button>
                        <Button 
                            onClick={() => handleFilterChange('editorias')}
                            className={activeFilter === 'editorias' ? 'active' : ''}
                        >
                            Editorias
                        </Button>
                        <Button 
                            onClick={() => handleFilterChange('tags')}
                            className={activeFilter === 'tags' ? 'active' : ''}
                        >
                            Tags
                        </Button>
                    </ButtonGroup>
                </div>
                <div className="itens mt-30 stack gap-30">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item: NewsItem, index: number) => (
                            <Link key={index} className="item card-default py-24 px-24"
                                  to={item?.url}>
                                <div className="flex gap-32 align-items-center flex-mb flex-column-mb">
                                    <div className="thumbnail m-w-218">
                                        <img src={flattenToAppURL(item.url + "/" + item.image_scales?.image[0]?.download) || "/images/news/default.png"} alt=""/>
                                    </div>
                                    <div className="content stack flex-1">
                                        <div className="flex flex-start">
                                            {item.editoria && (
                                                <span className="tag-color inline-block" style={{backgroundColor: item.editoria.cor_fundo}}>
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
                                                <img src="/icons/leia-mais.svg" alt=""/>
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
            </Container>
        </div>
    );
};

export default withBlockExtensions(View);
