import React from 'react';

import './sass/card-slide-item.scss';

/**
 * Card de exibição básica
 * @todo Contém um título (o assunto do card)
 * @todo Contém um ícone que é exibido ao lado esquerdo do título
 * @todo Contém uma descrição básica sobre o assunto
 * @todo Exibe um valor sobre o card
 * @todo Pode exibir um gráfico
 */
class CardSlideItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardHeaderIcon: require('./images/graph.png'),
            cardName: 'Nome do card',
            cardDescription: 'Descrição do card',
            cardTotal: 0,
            cardData: [],
            cardColorStep: '#3F6AD8',
            cardColorStepActive: '#3F6AD8',
            cardGraphLineColor: '#30B1FF',
            cardGraphBgColor: '#D6EFFF',
            active: ''
        }

        this.__renderStateProps = this.__renderStateProps.bind(this);
        this.__updateRenderStateProps = this.__updateRenderStateProps.bind(this);
    }

    /**
     * Registra os dados que vierem do props caso existam no state
     */
    __renderStateProps = () => {
        try {
            const state = Object.assign({}, this.state);
            for (let key in this.props) {
                if (state.hasOwnProperty(key)) {
                    state[key] = this.props[key];
                }
            }
            this.setState(state);
        }
        catch(error) {
            return;
        }
    }

    /**
     * Atualiza os dados que vierem do props caso existam no state
     */
    __updateRenderStateProps = (prevProps) => {
        try {
            const state = Object.assign({}, this.state);
            for (let key in this.props) {
                if (state.hasOwnProperty(key) && this.props[key] !== prevProps[key]) {
                    state[key] = this.props[key];
                }
            }
            this.setState(state);
        }
        catch(error) {
            return;
        }
    }

    componentDidMount() {
        this.__renderStateProps();
    }

    componentDidUpdate(prevProps) {
        this.__updateRenderStateProps(prevProps);
    }

    render() {
      const { cardHeaderIcon, cardName, cardDescription, cardTotal, active } = this.state;
      try {
        return (
            <div className={`card-slide-item ${active}`}>
                <div class='card'>
                    <div class='card-header'>
                        <div className='card-header-icon'>
                            <img className='icon-card' src={cardHeaderIcon} />
                        </div>
                        <div className='card-header-title'>{cardName}</div>
                    </div>
                    <div className='card-body'>
                        <div className='card-body-description'>{cardDescription}</div>
                        <div className='card-body-total'>{cardTotal}</div>
                        <div className='card-body-graph'></div>
                    </div>
                </div>
            </div>
        );
      }
      catch(error) {
        return(
            <div className='card-slide'>
                <div class='card'>
                    <div class='card-header'>
                        <div className='card-header-title'>Error</div>
                    </div>
                    <div className='card-body'>
                        <div className='card-body-description'>{error.message}</div>
                    </div>
                </div>
            </div>
        );
      }
    }
}

export default CardSlideItem;