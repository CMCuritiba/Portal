import React, {useEffect, useState} from 'react';
import {withBlockExtensions} from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import './style.less';
import {Link} from 'react-router-dom';
import {flattenToAppURL} from '@plone/volto/helpers/Url/Url';
import {Container, Typography, Button, Stack} from '@mui/material';
import {searchContent} from '@plone/volto/actions';
import {useDispatch, useSelector} from 'react-redux';

const Image = config.getComponent({name: 'Image'}).component;

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

const PAGE_SIZE = 20;

const View: React.FC<ViewProps> = (props) => {
    const {content, data} = props;
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

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Mostrar todas as páginas se forem poucas
            for (let i = 0; i < totalPages; i++) {
                pages.push(
                    <Button
                        key={i}
                        variant={currentPage === i ? "contained" : "text"}
                        onClick={() => setCurrentPage(i)}
                        sx={{
                            minWidth: '40px',
                            height: '40px',
                            borderRadius: "8px",
                            border:"none",
                            backgroundColor: currentPage === i ? '#3E8A8E' : 'transparent',
                            color: currentPage === i ? 'white' : '#333',
                            '&:hover': {
                                backgroundColor: currentPage === i ? '#006666' : 'rgba(0, 128, 128, 0.1)'
                            }
                        }}
                    >
                        {i + 1}
                    </Button>
                );
            }
        } else {
            // Lógica para mostrar reticências quando há muitas páginas
            const startPage = Math.max(0, currentPage - 2);
            const endPage = Math.min(totalPages - 1, currentPage + 2);

            // Primeira página
            if (startPage > 0) {
                pages.push(
                    <Button
                        key={0}
                        variant="text"
                        onClick={() => setCurrentPage(0)}
                        sx={{
                            minWidth: '40px',
                            height: '40px',
                            color: '#333',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 128, 128, 0.1)'
                            }
                        }}
                    >
                        1
                    </Button>
                );

                if (startPage > 1) {
                    pages.push(<span key="ellipsis1" style={{padding: '0 8px'}}>...</span>);
                }
            }

            // Páginas centrais
            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <Button
                        key={i}
                        variant={currentPage === i ? "contained" : "text"}
                        onClick={() => setCurrentPage(i)}
                        sx={{
                            minWidth: '40px',
                            height: '40px',
                            backgroundColor: currentPage === i ? '#008080' : 'transparent',
                            color: currentPage === i ? 'white' : '#333',
                            '&:hover': {
                                backgroundColor: currentPage === i ? '#006666' : 'rgba(0, 128, 128, 0.1)'
                            }
                        }}
                    >
                        {i + 1}
                    </Button>
                );
            }

            // Última página
            if (endPage < totalPages - 1) {
                if (endPage < totalPages - 2) {
                    pages.push(<span key="ellipsis2" style={{padding: '0 8px'}}>...</span>);
                }

                pages.push(
                    <Button
                        key={totalPages - 1}
                        variant="text"
                        onClick={() => setCurrentPage(totalPages - 1)}
                        sx={{
                            minWidth: '40px',
                            height: '40px',
                            color: '#333',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 128, 128, 0.1)'
                            }
                        }}
                    >
                        {totalPages}
                    </Button>
                );
            }
        }

        return pages;
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
                                                    style={{backgroundColor: item.editoria.cor_fundo}}
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

                {/* Paginação */}
                {total > PAGE_SIZE && (
                    <Stack direction="row" spacing={1} justifyContent="space-between" mt={4} alignItems="center" style={{borderTop:"1px solid #EAECF0", paddingTop:"20px"}}>
                        <Button
                            variant="text"
                            onClick={handlePrevious}
                            disabled={currentPage === 0}
                            sx={{
                                fontSize:"14px",
                                fontWeight:"600",
                                textTransform:"none",
                                color: currentPage === 0 ? '#ccc' : '#3E8A8E',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 128, 128, 0.1)'
                                }
                            }}
                        >
                            ← Anterior
                        </Button>

                        <Stack direction="row" spacing={1} justifyContent="center" mt={4} alignItems="center">
                            {renderPageNumbers()}
                        </Stack>

                        <Button
                            variant="text"
                            onClick={handleNext}
                            disabled={currentPage + 1 >= totalPages}
                            sx={{
                                fontSize:"14px",
                                fontWeight:"600",
                                textTransform:"none",
                                color: currentPage + 1 >= totalPages ? '#ccc' : '#3E8A8E',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 128, 128, 0.1)'
                                }
                            }}
                        >
                            Próximo →
                        </Button>
                    </Stack>
                )}
            </Container>
        </div>
    );
};

export default withBlockExtensions(View);
