import {templateTreeRender} from './templateTreeRender';

export const componentRender = (ComponentClass, componentData = null) => {
    const component = new ComponentClass();
    const renderedComponent = templateTreeRender(component.render(componentData));

    component.$$updateRefs(renderedComponent.refs);

    component.componentWillMount();

    return renderedComponent.fragment;
};
