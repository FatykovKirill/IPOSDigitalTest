const list = [{ mark: 'audi', model: 'A4', year: '2015', delivery: '21.05.2021-28.02.2022' },
{ mark: 'audi', model: 'A4', year: '2016', delivery: '01.05.2021-21.03.2022' },
{ mark: 'audi', model: 'A5', year: '2015', delivery: '21.05.2021-28.06.2021' },
{ mark: 'ВАЗ', model: '2101', year: '1970', delivery: '21.05.2021-28.02.2022' },]

const press = document.querySelector('.press')
const choosepress = document.querySelector('#press')
const chooseBtn = document.querySelector('#btn');
const squart = document.querySelectorAll('.squart');
const choosesquart = document.querySelectorAll('.squart-choose');
const btn = document.querySelector('.btn');
const btnModal = document.querySelector('.btnModal');
const date = document.querySelector('.date');
const modal = document.querySelector('.modal');
const mark = document.querySelector('#mark');
const model = document.querySelector('#model');
const year = document.querySelector('#year');

function AddDnSquart() {
    squart.forEach(el => {
        el.classList.add('display-none');
    });
}

function RemoveDnPress() {
    press.classList.remove('display-none');
}

function AddPointer() {
    btn.classList.add('pointer');
}

setTimeout(AddDnSquart, 3500);
setTimeout(RemoveDnPress, 3500);
setTimeout(AddPointer, 7000);

btn.addEventListener('click', () => {
    if (btn.classList.contains('pointer')) {
        modal.classList.remove('display-none')
        btn.classList.add('display-none');
        btn.classList.remove('squarts');
        btn.classList.remove('pointer');
        let i = 1
        squart.forEach(el => {
            el.classList.remove(`squart-${i++}`);
        });
        squart.forEach(el => {
            el.classList.remove(`squart`);
        });
        btn.classList.remove('btn');
    }
})

mark.innerHTML = '<option value="">Марка машины</option>'
model.innerHTML = '<option value="">Модель машины</option>'
year.innerHTML = '<option value="">Год</option>'

mark.addEventListener('focus', () => {
    let arrMark = [];
    list.forEach(el => arrMark.push(el.mark))
    let arrFilterMark = arrMark.filter((item, index) => {
        return arrMark.indexOf(item) === index
    });
    let out = '<option value="">Марка машины</option>';
    arrFilterMark.forEach(el => out += `<option value="${el}">${el}</option>`)
    mark.innerHTML = out;
    model.disabled = false;
})

model.addEventListener('focus', () => {
    const newList = list.filter(el => el.mark == mark.value);
    let arrModel = [];
    newList.forEach(el => arrModel.push(el.model))
    let arrFilterModel = arrModel.filter((item, index) => {
        return arrModel.indexOf(item) === index
    });
    let out = '<option value="">Модель машины</option>';
    arrFilterModel.forEach(el => out += `<option value="${el}">${el}</option>`)
    model.innerHTML = out;
    year.disabled = false;
})

year.addEventListener('focus', () => {
    const newList = list.filter(el => el.model == model.value);
    let arrYear = [];
    newList.forEach(el => arrYear.push(el.year))
    let arrFilterYear = arrYear.filter((item, index) => {
        return arrYear.indexOf(item) === index
    });
    let out = '<option value="">Год</option>';
    arrFilterYear.forEach(el => out += `<option value="${el}">${el}</option>`)
    year.innerHTML = out;
    btnModal.classList.remove('display-none');
})

if (year.disabled == true) {
    btnModal.classList.add('display-none');
}

btnModal.addEventListener('click', () => {
    if (mark.value == '' || model.value == '' || year.value == '') {
        alert('Не все поля заполнены')
        date.classList.add('display-none');
    } else {

        const arrDate = list.filter(el => el.mark == mark.value).filter(el => el.model == model.value).filter(el => el.year == year.value)
        date.classList.remove('display-none');
        const minDate = arrDate[0].delivery.slice(0, 10);
        const minDateYear = minDate.slice(6);
        const minDateMonth = minDate.slice(3, 5);
        const minDateDay = minDate.slice(0, 2);
        const newFormatMinDate = minDateYear + '-' + minDateMonth + '-' + minDateDay;
        const maxDate = arrDate[0].delivery.slice(11);
        const maxDateYear = maxDate.slice(6)
        const maxDateMonth = maxDate.slice(3, 5)
        const maxDateDay = maxDate.slice(0, 2)
        const newFormatMaxDate = maxDateYear + '-' + maxDateMonth + '-' + maxDateDay;
        date.min = newFormatMinDate;
        date.max = newFormatMaxDate;
        date.addEventListener('change', () => {
            modal.classList.add('display-none');
            chooseBtn.classList.remove('display-none');
            choosepress.classList.remove('display-none');
            choosepress.innerHTML = `вы выбрали ${mark.value} ${model.value} ${year.value},<br> доставка ${date.value},<br> начать заново`;
        })

        chooseBtn.addEventListener('click', () => {
            mark.value = '';
            model.value = '';
            year.value = '';
            date.value = '';
            model.disabled = true;
            year.disabled = true;
            modal.classList.add('display-none');
            btnModal.classList.add('display-none');
            date.classList.add('display-none');
            chooseBtn.classList.add('display-none');
            choosepress.classList.add('display-none');
            btn.classList.add('squarts');
            press.classList.add('display-none');
            let i = 1;
            choosesquart.forEach(el => {
                el.classList.add(`squart-${i++}`);
            });
            choosesquart.forEach(el => {
                el.classList.add('squart');
            });
            choosesquart.forEach(el => {
                el.classList.remove('display-none');
            });
            setTimeout(AddDnSquart, 3500);
            setTimeout(RemoveDnPress, 3500);
            setTimeout(AddPointer, 7000);
        })
    }
})