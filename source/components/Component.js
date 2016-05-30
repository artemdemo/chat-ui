export class Component {
    constructor() {
        this.refs = {};
    }

    componentWillMount() {}

    $$updateRefs(newRefs) {
        this.refs = newRefs;
    }

    render() {
        return {
            div: {
                innerHTML: 'Basic Component'
            }
        };
    }
}
