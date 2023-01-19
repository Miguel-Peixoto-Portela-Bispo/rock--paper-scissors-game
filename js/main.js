let CPUOptionContainer = document.getElementById('computer-option');
let leftButton = document.getElementById('left-button');
let rightButton = document.getElementById('right-button');
let buttonsContainer = document.getElementById('buttons-container');
let playerOptionContainer = document.getElementById('cur-player-option');
let winnerContainer = document.getElementById('winner');
let cpuText = document.getElementById('cpu');
let userText = document.getElementById('you');
let curPlayerOption = 0;
let curCPUOption = 0;
let possibleOptions = ['Rock', 'Paper', 'Scissors'];
let optionsIconMap = new Map();
let definingCPUOption = false;
let speed = 500;
optionsIconMap.set('Rock', 'fa-regular fa-hand-back-fist');
optionsIconMap.set('Paper', 'fa-regular fa-hand');
optionsIconMap.set('Scissors', 'fa-regular fa-hand-scissors');
setComponentsSize();
setValueToPlayer();
window.addEventListener('resize', setComponentsSize);
CPUOptionContainer.addEventListener('mouseenter', (e)=>
{
    CPUOptionContainer.style.backgroundColor = '#7590b3';
});
CPUOptionContainer.addEventListener('mouseleave', (e)=>
{
    CPUOptionContainer.style.backgroundColor = '##A3CBFF';
});
CPUOptionContainer.addEventListener('click', ()=>{
    if(!definingCPUOption)
    {
        cpuText.style.color = '#006EFF';
        userText.style.color = 'black';
        definingCPUOption = true;
        setValueToCPU();
    }
});
leftButton.addEventListener('click', (e)=>
{
    if(!definingCPUOption)
    {
        curPlayerOption--;
        if(curPlayerOption<0)
        {
            curPlayerOption = possibleOptions.length-1;
        }
        setValueToPlayer();
    }
})
rightButton.addEventListener('click', (e)=>
{
    if(!definingCPUOption)
    {
        curPlayerOption++;
        if(curPlayerOption>possibleOptions.length-1)
        {
            curPlayerOption = 0;
        }
        setValueToPlayer();
    }
})
function getRandomNumber(min, max)
{
    return Math.random()*(max-min)+min;
}
function setValueToPlayer()
{
    playerOptionContainer.innerHTML = `<i class="${optionsIconMap.get(possibleOptions[curPlayerOption])}"></i>`
}
function setComponentsSize()
{
    CPUOptionContainer.style.height = CPUOptionContainer.getBoundingClientRect().width+'px';
    CPUOptionContainer.style.lineHeight = CPUOptionContainer.getBoundingClientRect().width+'px';
    let containerRect = buttonsContainer.getBoundingClientRect();
    leftButton.style.height = (Math.min(containerRect.width, containerRect.height)/1.5)+'px';
    rightButton.style.height = (Math.min(containerRect.width, containerRect.height)/1.5)+'px';
    leftButton.style.width = (Math.min(containerRect.width, containerRect.height)/1.5)+'px';
    rightButton.style.width = (Math.min(containerRect.width, containerRect.height)/1.5)+'px';
    playerOptionContainer.style.height = (buttonsContainer.getBoundingClientRect().height/1.2)+'px';
    playerOptionContainer.style.width = Math.floor(buttonsContainer.getBoundingClientRect().width/3.5)+'px';
    playerOptionContainer.style.lineHeight = playerOptionContainer.style.height;
}
function setValueToCPU()
{
    if(definingCPUOption)
    {
        if(speed<=0)
        {
            cpuText.style.color = 'black';
            userText.style.color = '#006EFF';
            CPUOptionContainer.style.backgroundColor = '#a3cbff';
            definingCPUOption = false;
            compareWinner();
            speed= Math.floor(getRandomNumber(500, 1000))
        }
        else
        {
            CPUOptionContainer.style.backgroundColor = `rgb(${Math.floor(getRandomNumber(0, 255))}, ${Math.floor(getRandomNumber(0, 255))}, ${Math.floor(getRandomNumber(0, 255))})`
            let sub = Math.floor(getRandomNumber(50, 100));
            speed-= speed-sub<0?speed:sub;
            curCPUOption++;
            console.log(speed)
            setTimeout(setValueToCPU, speed);
        }
    }
    CPUOptionContainer.innerHTML = `<i class="${optionsIconMap.get(possibleOptions[curCPUOption%3])}"></i>`
}
function compareWinner()
{
    if(possibleOptions[curCPUOption%3]!==possibleOptions[curPlayerOption])
    {
        if(possibleOptions[curCPUOption%3] === 'Rock')
        {
            if(possibleOptions[curPlayerOption] === 'Paper')
            {
                winnerContainer.style.color = '#77FF77';
                winnerContainer.innerText = 'Winner: You';
            }
            else
            {
                winnerContainer.style.color = '#FF7777';
                winnerContainer.innerText = 'Winner: CPU';
            }
        }
        else if(possibleOptions[curCPUOption%3] === 'Paper')
        {
            if(possibleOptions[curPlayerOption] === 'Scissors')
            {
                winnerContainer.style.color = '#77FF77';
                winnerContainer.innerText = 'Winner: You';
            }
            else
            {
                winnerContainer.style.color = '#FF7777';
                winnerContainer.innerText = 'Winner: CPU';
            }
        }
        else if(possibleOptions[curCPUOption%3] === 'Scissors')
        {
            if(possibleOptions[curPlayerOption] === 'Rock')
            {
                winnerContainer.style.color = '#77FF77';
                winnerContainer.innerText = 'Winner: You';
            }
            else
            {
                winnerContainer.style.color = '#FF7777';
                winnerContainer.innerText = 'Winner: CPU';
            }
        }
    }
    else
    {
        winnerContainer.style.color = '#777777';
        winnerContainer.innerText = 'Draw';
    }
}