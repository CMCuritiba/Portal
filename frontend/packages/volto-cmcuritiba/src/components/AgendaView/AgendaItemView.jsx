import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RenderBlocks} from "@plone/volto/components";
import {Link} from "react-router-dom";
import SidebarEvento from "./SidebarEvento";
import {getQueryStringResults} from "@plone/volto/actions";
import {formatarDataParaAgenda, formatarIntervaloHorario} from "../../utils/Utils";
import {flattenToAppURL} from "@plone/volto/helpers";



const AgendaItemView = (Props) => {
  console.log(Props.content);
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.querystringsearch.items);
  const {content} = Props;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('pt-BR', { month: 'short' })
    };
  };

  const getEventTypeColor = (eventType) => {
    const colors: Record<string, string> = {
      'sessao-plenaria': '#007AFF',
      'audiencia-publica': '#E6B941',
      'default': '#007AFF'
    };
    return colors[eventType] || colors.default;
  };

  useEffect(() => {
    dispatch(
      getQueryStringResults('/institucional/agenda-de-atividades', {
        query: [
          {
            i: 'portal_type',
            o: 'plone.app.querystring.operation.selection.is',
            v: ['Event']  // this must be an array
          },
          {
            i: 'start',
            o: 'plone.app.querystring.operation.date.afterToday',
            v: ''
          },
          {
            i: 'id',
            o: 'plone.app.querystring.operation.string.isNot',
            v: content?.id
          }
        ],
        b_start:0,
        b_size:30,
        sort_on: 'start',
        sort_order: 'ascending',
        fullobjects:1
      })
    )
  }, [dispatch])

  return (
    <div id="page-document" className="view-wrapper newsitem-view">
      <div className="container">
        <div className="flex gap-32 mobile-flex-direction-col">
          <div className="sd content-single">
            <RenderBlocks content={content}/>
          </div>
          <SidebarEvento content={content}/>
        </div>
        {
          searchResults?.length > 0 && (
            <div className="mt-32">
              <h2 className="flex gap-16 fs-18 fw-600 align-items-center">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.32" fill-rule="evenodd" clip-rule="evenodd" d="M2.12411 8.37988H21.8758C21.9467 9.58097 22 11.2065 22 13.3799C22 16.8641 21.8631 18.9404 21.7362 20.117C21.6422 20.9887 21.0518 21.6609 20.1903 21.8241C18.8494 22.0781 16.3428 22.3799 12 22.3799C7.65725 22.3799 5.15055 22.0781 3.80967 21.8241C2.94826 21.6609 2.35785 20.9887 2.26379 20.117C2.13682 18.9404 2 16.8641 2 13.3799C2 11.2065 2.05324 9.58097 2.12411 8.37988ZM6.5 13.0614C6.5 12.4604 6.93315 11.988 7.5337 11.9667C8.3136 11.9389 9.6669 11.9073 12 11.8868C14.5069 11.8646 15.8826 11.8995 16.6312 11.9398C17.1554 11.968 17.5 12.3745 17.5 12.8995V13.2906C17.5 13.8524 17.1157 14.2892 16.5543 14.3138C15.7898 14.3473 14.4235 14.3799 12 14.3799C9.5765 14.3799 8.21025 14.3473 7.44565 14.3138C6.88435 14.2892 6.5 13.8524 6.5 13.2906V13.0614ZM6.5 17.4689C6.5 16.9074 6.8844 16.4592 7.44515 16.4302C7.97275 16.4029 8.7795 16.3799 10 16.3799C11.2205 16.3799 12.0272 16.4029 12.5548 16.4302C13.1156 16.4592 13.5 16.9074 13.5 17.4689V17.7909C13.5 18.3524 13.1156 18.8007 12.5548 18.8297C12.0272 18.8569 11.2205 18.8799 10 18.8799C8.7795 18.8799 7.97275 18.8569 7.44515 18.8297C6.8844 18.8007 6.5 18.3524 6.5 17.7909V17.4689Z" fill="#2D3748"/>
                  <path d="M17.915 2.41114C18.2276 2.43691 18.4424 2.66586 18.4636 2.97877C18.4831 3.26624 18.5 3.70906 18.5 4.37988C18.5 4.48764 18.4995 4.58952 18.4987 4.68582C19.1999 4.7662 19.7561 4.85345 20.1902 4.93569C21.0516 5.0989 21.642 5.77103 21.7361 6.64273C21.7839 7.08538 21.833 7.65543 21.8758 8.37988H2.12402C2.16677 7.65543 2.21593 7.08538 2.2637 6.64273C2.35776 5.77103 2.94817 5.0989 3.80958 4.93569C4.24369 4.85344 4.8 4.76619 5.50125 4.6858C5.50045 4.58951 5.5 4.48764 5.5 4.37988C5.5 3.70906 5.5169 3.26624 5.5364 2.97877C5.5576 2.66586 5.7724 2.43691 6.08495 2.41114C6.29765 2.3936 6.5938 2.37988 7 2.37988C7.4062 2.37988 7.70235 2.3936 7.91505 2.41114C8.2276 2.43691 8.4424 2.66586 8.4636 2.97877C8.4831 3.26624 8.5 3.70906 8.5 4.37988C8.5 4.40528 8.5 4.43035 8.49995 4.45509C9.50645 4.40832 10.6666 4.37988 11.9999 4.37988C13.3332 4.37988 14.4935 4.40833 15.5 4.4551L15.5 4.37988C15.5 3.70906 15.5169 3.26624 15.5364 2.97877C15.5576 2.66586 15.7724 2.43691 16.0849 2.41114C16.2976 2.3936 16.5938 2.37988 17 2.37988C17.4062 2.37988 17.7023 2.3936 17.915 2.41114Z" fill="#2D3748"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5337 11.9667C6.93315 11.988 6.5 12.4604 6.5 13.0614V13.2906C6.5 13.8524 6.88435 14.2892 7.44565 14.3138C8.21025 14.3473 9.5765 14.3799 12 14.3799C14.4235 14.3799 15.7897 14.3473 16.5543 14.3138C17.1156 14.2892 17.5 13.8524 17.5 13.2906V12.8995C17.5 12.3745 17.1554 11.968 16.6312 11.9398C15.8825 11.8995 14.5069 11.8646 12 11.8868C9.6669 11.9073 8.3136 11.9389 7.5337 11.9667ZM7.44515 16.4302C6.8844 16.4592 6.5 16.9074 6.5 17.4689V17.7909C6.5 18.3524 6.8844 18.8007 7.44515 18.8297C7.97275 18.8569 8.7795 18.8799 10 18.8799C11.2205 18.8799 12.0272 18.8569 12.5548 18.8297C13.1156 18.8007 13.5 18.3524 13.5 17.7909V17.4689C13.5 16.9074 13.1156 16.4592 12.5548 16.4302C12.0272 16.4029 11.2205 16.3799 10 16.3799C8.7795 16.3799 7.97275 16.4029 7.44515 16.4302Z" fill="#2D3748"/>
                </svg>
                Próximas atividades
              </h2>
              <div className="mt-40">
                <div className="grid-col-3 gap-32 overflow-auto-mobile child-75vw">
                  {searchResults?.map((event, index) => {
                    const date = formatDate(event.start);
                    const eventType = event.event_type || 'default';
                    const bgColor = getEventTypeColor(eventType);
                    const {dia, mes} = formatarDataParaAgenda(event.start);
                    return (
                      <div key={index} className="card-default card cursor-default">
                        <div className="position-relative">
                          <img
                            src={event.preview_image?.download
                              ? flattenToAppURL(event?.preview_image?.download)
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
                              {formatarIntervaloHorario(event.start, event.end)}
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

                            <Link to={event['@id']} className="link-green w-100" title="Saiba mais">
                              Saiba mais
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-32">
                <h3 className="title-back fw-600 flex flex-between w-100 align-items-center">
                  Agenda
                  <a className="ver-mais-flex">
                    Ver todos
                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M12.3904 23.0796C12.1404 22.8296 12 22.4905 12 22.1369C12 21.7834 12.1404 21.4443 12.3904 21.1943L16.781 16.8036L12.3904 12.4129C12.1475 12.1615 12.0131 11.8247 12.0161 11.4751C12.0192 11.1255 12.1594 10.7911 12.4066 10.5438C12.6538 10.2966 12.9883 10.1564 13.3378 10.1534C13.6874 10.1503 14.0242 10.2847 14.2757 10.5276L19.609 15.8609C19.859 16.111 19.9994 16.4501 19.9994 16.8036C19.9994 17.1572 19.859 17.4962 19.609 17.7463L14.2757 23.0796C14.0257 23.3296 13.6866 23.47 13.333 23.47C12.9795 23.47 12.6404 23.3296 12.3904 23.0796Z"
                            fill="white"/>
                    </svg>
                  </a>
                </h3>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
};

export default AgendaItemView;
