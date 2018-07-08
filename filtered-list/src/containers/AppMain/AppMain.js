import React, { Component } from 'react';
import {Aux} from './../../helpers/helpers';

import FilterSelector from './../../components/FilterSelector/FilterSelector';
import ItemList from './../../components/ItemList/ItemList';

class AppMain extends Component {

    state = {
        categories: {}
    }
    componentDidMount() {
        this.props.productData.forEach(prod => {
            this.setState(prevState => {
                prevState.categories[prod.category] = true;
                return prevState;
            })
        })
    }
    categorySelector = (e) => {
        const category = e.target.name;
        const checked = e.target.checked;
        this.setState(prevState => {
            prevState.categories[category] = checked;
            return prevState;
        })
    }
    render() {
        return (
            <Aux>
                <FilterSelector categories={this.state.categories} categorySelector={this.categorySelector} />
                <ItemList categories={this.state.categories} productData={this.props.productData} />
            </Aux>
        );
    }
}

export default AppMain;