const Aux = props => props.children;

const getCategoryColor = categoryName => {
    switch (categoryName) {
        case 'Fruit':
            return 'warning';
        case 'Vegetable':
            return 'success';
        case 'Meat':
            return 'danger';
        default:
            return 'secondary'
    }
}

export {Aux, getCategoryColor};