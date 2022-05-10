import {LitElement, html, css} from 'lit'

class LitCounter extends LitElement {

    static properties = {
        count: {}
    }

    static styles = css`
        button{
            color: var(--my-color)
        }
    `

    constructor(){
        super()
        this.count = 0;
    }

    firstUpdated(){

    }

    render(){
        return html`<button @click=${()=>this.count++}>${this.count}</button>`
    }
}

customElements.define('lit-counter', LitCounter)




















class MyDiv extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        this.shadowRoot.innerHTML = `
            <style>
                div{
                    width:100px; 
                    height:100px; 
                    background: green;
                }
            </style>
            <div style="">
                <slot></slot>
            </div>
        `
    }
}

customElements.define('my-div', MyDiv)

class Counter extends HTMLElement {

    static get observedAttributes(){
        return ['count']
    }

    get count(){
        return this.getAttribute('count')?this.getAttribute('count'):0;
    }

    set count(count){
        this.setAttribute('count', count);
    }

    attributeChangedCallback(attr, oldValue, newVal){
        if(attr == 'count'){
            this.btn.textContent = newVal;
        }
    }


    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <button>${this.count}</button>
        `
        this.btn = this.shadowRoot.querySelector('button')
        this.btn.addEventListener('click', ()=> this.count++)
    }
}

customElements.define('my-counter', Counter)
