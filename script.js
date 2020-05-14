
const generateID=()=>`Huge${Math.random()*1e8}`

// Обращаемся по селектору querySelector или по id getElementById
const totalBalance = document.querySelector('.total__balance'),
totalMoneyIncome=document.querySelector('.total__money-income'),
totalMoneyExpenses = document.querySelector('.total__money-expenses'),
historyList = document.querySelector('.history__list'),
form =document.getElementById('form'),
operationName=document.querySelector('.operation__name'),
operationAmount=document.querySelector('.operation__amount');

let dbOperation = [
    {
    id:'1',
    description:'Получил зарплату',
    amount:30000
    },

    {
        id:'2',
        description:'Квартплата',
        amount:-10000
        },
        {
            id:'3',
            description:'Купила обувь',
            amount:-6000
            },
            {
                id:'4',
                description:'Получила стипендию',
                amount:7000
                },
];

const renderOperation=(operation)=>{

    const className =operation.amount<0?'history__item-minus':'history__item-plus';
     const listItem = document.createElement('li');// создали тег списка
     listItem.classList.add('history__item');
     listItem.classList.add(className);
     listItem.innerHTML = `${operation.description}
          <span class="history__money">${operation.amount} ₽</span>
          <button class="history_delete">x</button>     
     `;
    historyList.append(listItem);
}


const updateBalance=()=>{
   const resultIncome = dbOperation.filter((item)=>item.amount >0)
   .reduce((result,item)=>result + item.amount,0);

 const resultExpenses = dbOperation.filter((item)=> item.amount<0)
 .reduce((result,item)=>result + item.amount,0);

 totalMoneyIncome.textContent = resultIncome;
 totalMoneyExpenses.textContent =  resultExpenses;
 totalBalance.textContent= resultIncome+resultExpenses;
}



const init =()=>{
   historyList.textContent = '';

   dbOperation.forEach(renderOperation);
   updateBalance();
   
};

const addOperation=(event)=>{
    event.preventDefault();  // запрет на события браузера, в нашем случае нет перезагрузки
    const operationNameValue = operationName.value,
    operationAmountValue = operationAmount.value;

    if(operationNameValue  && operationAmountValue ){ // если поля пустые -> красная рамка
        const operation ={
            id: generateID(),
            description: operationNameValue,
            amount:operationNameValue,
        };
        dbOperation.push(operation);
        init()

    }else {
    if(!operationNameValue)operationName.style.borderColor = 'red';
    if (!operationAmountValue)operationAmount.style.borderColor = "red";
}
operationName.value ='';
operationAmount.value ='';


};
form.addEventListener('submit',addOperation)

init();

