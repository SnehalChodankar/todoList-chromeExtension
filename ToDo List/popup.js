document.querySelector('.create-todo').addEventListener('click', function(){
    document.querySelector('.new-item').style.display='block';
});

document.querySelector('.new-item button').addEventListener('click', function(){
    var itemName = document.querySelector('.new-item input').value;
    if(itemName!=""){
        var itemsStorage = localStorage.getItem('todo-items');
        var itemsArr = JSON.parse(itemsStorage);

        if(itemsArr == null)
            itemsArr = [];

        itemsArr.push({"item":itemName, "status":0});

        saveItems(itemsArr);
        fetchItems();
        document.querySelector('.new-item input').value = "";
        document.querySelector('.new-item').style.display='none';
    }
});

function fetchItems(){
    const itemsList = document.querySelector('ul.todo-items');
    itemsList.innerHTML = '';
    var newItemHTML = '';

    try{
        var items = localStorage.getItem('todo-items');
        var itemsArr = JSON.parse(items);
        for(var i=0;i<itemsArr.length;i++){
            var status = '';

            if(itemsArr[i].status == 1){
                status = 'class="done"';
            }

            newItemHTML += `<li data-itemIndex="${i}" ${status}>
                                <span class="item">
                                    ${itemsArr[i].item}
                                </span>
                                <div>
                                    <span class="itemComplete" style="border: 1px solid green; background-color: greenyellow; padding: 2px;">
                                        Done
                                    </span>
                                    <span class="itemDelete" style="border: 1px solid black; background-color: red; padding: 2px;">
                                        Delete
                                    </span>
                                </div>
                            </li>`
        }
        itemsList.innerHTML = newItemHTML;

        var itemsListUL = document.querySelectorAll('ul li');
        for (let i = 0; i < itemsListUL.length; i++) {
            itemsListUL[i].querySelector('.itemComplete').addEventListener('click', function(){
                var index = this.parentNode.parentNode.dataset.itemindex;
                itemComplete(index);
            });
            itemsListUL[i].querySelector('.itemDelete').addEventListener('click', function(){
                var index = this.parentNode.parentNode.dataset.itemindex;
                itemDelete(index);
            });
        }
    }catch(e){}
}

function itemComplete(index){
    var items = localStorage.getItem('todo-items');
    var itemsArr = JSON.parse(items);

    itemsArr[index].status = 1;

    saveItems(itemsArr);

    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className='done';
}

function itemDelete(index){
    var items = localStorage.getItem('todo-items');
    var itemsArr = JSON.parse(items);

    itemsArr.splice(index, 1);

    saveItems(itemsArr);

    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').remove();

}

function saveItems(obj){
    var string = JSON.stringify(obj);
    localStorage.setItem('todo-items', string);
}

fetchItems();