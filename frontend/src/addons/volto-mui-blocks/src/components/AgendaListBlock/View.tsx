import React, {useEffect, useState} from 'react';
import {flattenToAppURL, withBlockExtensions} from '@plone/volto/helpers';
import {useDispatch, useSelector} from "react-redux";
import {getQueryStringResults} from '@plone/volto/actions';
import "./style.less";
import config from '@plone/volto/registry';
import {Button} from "@mui/material";

interface Event {
    '@id': string;
    title: string;
    start: string;
    end: string;
    start_time: string;
    end_time: string;
    event_type: string;
    event_type_title: string;
    location: string;
    subjects?: string[];
    preview_image?: {
        download: string;
    };
    image?: {
        scales?: {
            preview?: {
                download: string;
            };
        };
    };
}

interface ViewProps {
    data: any;
    isEditMode: boolean;
    className?: string;
    block: string;
    classes: any;
}

const Image = config.getComponent({name: 'Image'}).component;

const View = (props: ViewProps) => {
    const {data, isEditMode, className, block, classes} = props;
    const dispatch = useDispatch();
    const [events, setEvents] = useState<Event[]>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const searchResults = useSelector((state: any) => state.querystringsearch.items);

    const eventTypeOptions = [
        { value: '', label: 'Todos os tipos' },
        { value: 'Sessão Plenária', label: 'Sessão Plenária' },
        { value: 'Audiência Pública', label: 'Audiência Pública' },
        { value: 'Reunião de Comissão', label: 'Reunião de Comissão' },
        { value: 'Evento Especial', label: 'Evento Especial' }
    ];

    const buildQuery = () => {
        let query = [
            {
                i: 'portal_type',
                o: 'plone.app.querystring.operation.selection.is',
                v: ['Event']
            }
        ];

        // Filtro por data usando seletor de data de início e fim
        if (startDate || endDate) {
            if (startDate && endDate) {
                // Filtro por intervalo de datas
                query.push({
                    i: 'start',
                    o: 'plone.app.querystring.operation.date.between',
                    v: [startDate, endDate]
                });
            } else if (startDate) {
                // Filtro apenas por data de início
                query.push({
                    i: 'start',
                    o: 'plone.app.querystring.operation.date.largerThan',
                    v: startDate
                });
            } else if (endDate) {
                // Filtro apenas por data de fim
                query.push({
                    i: 'start',
                    o: 'plone.app.querystring.operation.date.lessThan',
                    v: endDate
                });
            }
        } else {
            // Apenas eventos futuros quando não há filtro de data específico
            query.push({
                i: 'start',
                o: 'plone.app.querystring.operation.date.afterToday',
                v: ''
            });
        }

        // Filtro por tipo de evento
        if (selectedType) {
            query.push({
                i: 'Subject',
                o: 'plone.app.querystring.operation.selection.any',
                v: [selectedType]   
            });
        }

        return query;
    };

    const fetchEvents = () => {
        const query = buildQuery();
        console.log('Query sendo enviada:', query);
        console.log('Filtros aplicados:', { startDate, endDate, selectedType });

        dispatch(
            getQueryStringResults('/institucional/agenda-de-atividades', {
                query: query,
                b_start: 0,
                b_size: 30,
                sort_on: 'start',
                sort_order: 'ascending',
                fullobjects: 1
            })
        );
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (searchResults) {
            console.log('Eventos recebidos:', searchResults);
            console.log('Primeiro evento subjects:', searchResults[0]?.subjects);
            setEvents(searchResults);
        }
    }, [searchResults]);

    const handleApplyFilters = (e: React.FormEvent) => {
        e.preventDefault();
        fetchEvents();
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleString('pt-BR', { month: 'short' })
        };
    };

    const getEventTypeColor = (eventType: string) => {
        const colors: Record<string, string> = {
            'sessao-plenaria': '#007AFF',
            'audiencia-publica': '#E6B941',
            'reuniao-comissao': '#28A745',
            'evento-especial': '#6F42C1',
            'default': '#007AFF'
        };
        return colors[eventType] || colors.default;
    };

    return (
        <section className="stack gap-24 max-w-100 py-32">
            <div className="container w-100-w">
                <div className="background-color-cinza-soft py-32" style={{paddingTop:0}}>
                    <div className="container pl-mb pr-mb">
                        <div className="legislacoes select-internal">
                            <form onSubmit={handleApplyFilters} className="flex gap-24 flex-wrap">
                                <div className="flex gap-8 align-items-center">
                                    <label htmlFor="start-date" className="fs-14 fw-500">Data de início:</label>
                                    <input
                                        id="start-date"
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        style={{minWidth: "180px", padding: "8px 12px", fontSize: "14px"}}
                                    />
                                </div>
                                <div className="flex gap-8 align-items-center">
                                    <label htmlFor="end-date" className="fs-14 fw-500">Data de fim:</label>
                                    <input
                                        id="end-date"
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        style={{minWidth: "180px", padding: "8px 12px", fontSize: "14px"}}
                                    />
                                </div>
                                <div className="flex gap-8 align-items-center">
                                    <label htmlFor="event-type" className="fs-14 fw-500">Tipo do evento:</label>
                                    <select
                                        id="event-type"
                                        style={{minWidth: "180px", padding: "8px 12px", fontSize: "14px"}}
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                    >
                                        {eventTypeOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex align-items-end">
                                    <Button
                                        type="submit"
                                        className="button button-primary"
                                        style={{minHeight: "42px", padding: "8px 16px"}}
                                    >
                                        Aplicar
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="grid-col-3 gap-32 flex-column-mb grid-cols-mb-1">
                    {events?.map((event, index) => {
                        const date = formatDate(event.start);
                        const eventType = event.event_type || 'default';
                        const bgColor = getEventTypeColor(eventType);
                        const eventDate = new Date(event.start);
                        const dia = eventDate.getDate();
                        const mes = eventDate.toLocaleString('pt-BR', { month: 'short' }).toUpperCase();

                        return (
                            <div key={index} className="card-default card cursor-default">
                                <div className="position-relative">
                                    <img
                                        src={event.preview_image?.download
                                            ? flattenToAppURL(event.preview_image.download)
                                            : '/images/agenda/agenda-1.jpg'
                                        }
                                        className="w-100 aspect-ratio-16-9"
                                        alt={event.title}
                                    />
                                    <div className="agenda-data">
                                        <span>{dia}</span>
                                        <span>{mes}</span>
                                    </div>
                                </div>
                                <div className="px-16 py-16 stack flex-column gap-16 flex-between align-items-start flex-auto">
                                    <div className="flex-1-auto stack flex-column gap-16 flex-start align-items-start">
                                        <span
                                            className="tag-color inline-block"
                                            style={{backgroundColor: bgColor, color: bgColor === '#E6B941' ? 'black' : 'white'}}
                                        >
                                            {event?.subjects?.[0] || 'Evento'}
                                        </span>
                                        <h3 className="fs-18 fw-600 mt-0 mb-0">
                                            {event.title}
                                        </h3>
                                        <span className="tag-agenda">
                                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.00016 15.4808C11.6822 15.4808 14.6668 12.4961 14.6668 8.81413C14.6668 5.13213 11.6822 2.14746 8.00016 2.14746C4.31816 2.14746 1.3335 5.13213 1.3335 8.81413C1.3335 12.4961 4.31816 15.4808 8.00016 15.4808ZM8.50016 6.14746C8.50016 6.01485 8.44748 5.88768 8.35372 5.79391C8.25995 5.70014 8.13277 5.64746 8.00016 5.64746C7.86755 5.64746 7.74038 5.70014 7.64661 5.79391C7.55284 5.88768 7.50016 6.01485 7.50016 6.14746V8.81413C7.50016 8.94679 7.55283 9.07413 7.64683 9.16746L9.3135 10.8341C9.35927 10.8833 9.41447 10.9227 9.4758 10.95C9.53714 10.9773 9.60335 10.992 9.67048 10.9932C9.73762 10.9944 9.8043 10.982 9.86656 10.9569C9.92882 10.9317 9.98538 10.8943 10.0329 10.8468C10.0803 10.7993 10.1178 10.7428 10.1429 10.6805C10.1681 10.6183 10.1804 10.5516 10.1792 10.4844C10.178 10.4173 10.1633 10.3511 10.136 10.2898C10.1087 10.2284 10.0693 10.1732 10.0202 10.1275L8.50016 8.60746V6.14746Z" fill="#637381"/>
                                            </svg>
                                            {new Date(event.start).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <span className="tag-agenda">
                                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14 6.9873C14 11.654 8 15.654 8 15.654C8 15.654 2 11.654 2 6.9873C2 5.39601 2.63214 3.86988 3.75736 2.74466C4.88258 1.61945 6.4087 0.987305 8 0.987305C9.5913 0.987305 11.1174 1.61945 12.2426 2.74466C13.3679 3.86988 14 5.39601 14 6.9873Z" stroke="#637381" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M8 8.9873C9.10457 8.9873 10 8.09187 10 6.9873C10 5.88273 9.10457 4.9873 8 4.9873C6.89543 4.9873 6 5.88273 6 6.9873C6 8.09187 6.89543 8.9873 8 8.9873Z" stroke="#637381" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            {event.location || 'Câmara Municipal de Curitiba'}
                                        </span>
                                    </div>
                                    <div className="flex flex-direction-column w-100 gap-16">
                                        <a href="#" className="button button-third w-100" title="Cadastrar na agenda">
                                            Cadastrar na agenda
                                        </a>
                                        <a href={event['@id']} className="link-green w-100" title="Saiba mais">
                                            Saiba mais
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default withBlockExtensions(View);

