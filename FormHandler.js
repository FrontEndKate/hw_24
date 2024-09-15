class FormHandler {
    constructor(selector) {
        this.formElement = document.querySelector(selector)
    }


    addHandler = (func) => {
        this.formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            let objData = {};
            console.log(this.formElement.elements)
            const data = Array.from(this.formElement.elements)
            console.log(data)
            data.filter(item => item.name)
                .map(element => {
                    let name = element.name;// coffee |size
                    let value = element.value;// latte   | large
                    let checked = element.checked
                    let type = element.type
                    if(type !== "radio")
                        objData[name] = value;
                    else if(checked)
                        objData[name] = value;
                })
            console.log(objData)
            let res = func(objData)
            if(!res)
                e.target.reset();
        })
    }
}
