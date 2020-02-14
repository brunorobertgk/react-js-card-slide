import React from 'react';
import CardSlideItem from './card';
import './sass/card-slide.scss';

class CardSlide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            cardSelected: 1
        }
        this.__renderStateProps = this.__renderStateProps.bind(this);
        this.chooseCardSlideItem = this.chooseCardSlideItem.bind(this);
        this.nextItem = this.nextItem.bind(this);
        this.prevItem = this.prevItem.bind(this);
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
     * Seleciona um slide ao clicar em um dot [bolinha(s) que aparece abaixo do slide]
     */
    chooseCardSlideItem = (slideItem) => {
        try {
            this.setState({
                cardSelected: slideItem+1
            });
        }
        catch(error) {
            return;
        }
    }

    /**
     * Retorna para o item anterior do slide
     */
    prevItem = () => {
        if (this.state.cardSelected === 1) return false;
        try {
            this.setState({
                cardSelected: this.state.cardSelected-1
            });
        }
        catch(error) {
            return;
        }
    }

    /**
     * Avança para o próximo item do slide
     */
    nextItem = () => {
        if (this.state.cardSelected === this.state.items.length) return false;
        try {
            this.setState({
                cardSelected: this.state.cardSelected-1
            });
        }
        catch(error) {
            return;
        }
    }

    componentDidMount() {
        this.__renderStateProps();
    }

    render() {
        const { items, cardSelected } = this.state;
        try {
            return(
                <div className='card-slide'>
                    <div className='card-slide-container'>
                        {items.map( (item, key) => {
                            if (key === (cardSelected-1)) {
                                item.active = 'enabled';
                            } else {
                                item.active = 'disabled';
                            }
                            return <CardSlideItem key={key} {...item}/>
                        })}
                        {items.length < cardSelected && <a className='prev' onClick={this.prevItem}>❮</a>}
                        {items.length > cardSelected && <a className='next' onClick={this.nextItem}>❯</a>}
                    </div>
                    <div className='card-dot'>
                        {items.length > 1 && items.map((item, key) => {
                            return <span className='dot' key={key} onClick={() => this.chooseCardSlideItem(key)} />
                        })}
                        
                    </div>
                </div>
            );
        }
        catch(error) {
            return (
                <div>{error.message}</div>
            );
        }
    }
}

export default CardSlide;