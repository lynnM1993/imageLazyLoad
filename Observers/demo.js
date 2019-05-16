// 观察者列表
class ObserverList {
    constructor() {
        this.observerList = [];
    }

    add(observer) {
        this.observerList.push(observer)
    }

    removeAt(index) {
        this.observerList.splice(index, 0)
    }

    indexOf(observer, startIndex) {
        var i = startIndex || 0;
        while (i < this.observerList.length) {
            if (observer === this.observerList[i]) {
                return i
            }
            i++
        }
        return i
    }

    get(index) {
        if (index <= this.observerList.length - 1) {
            return this.observerList[index]
        } else {
            return undefined
        }
    }

    count() {
        return this.observerList.length
    }
}


// 主题 内容
class Subject {
    constructor() {
        this.observers = new ObserverList();
    }

    addObserver(obj) {
        this.observers.add(obj)
    }

    getObserver(index) {
        return this.observers.get(index)
    }

    removeObserver(index) {
        this.observers.removeAt(index)
    }

    // 发布
    notifiy(context) {
        var count = this.observers.count();
        for (var i = 0; i < count; i++) {
            this.observers.get(i).update(context, this.observers.get(i))
        }
    }
    notifiy2(context) {
        var count = this.observers.count();
        for (var i = 0; i < count; i++) {
            this.observers.get(i).update2(context, this.observers.get(i))
        }
    }
}

class Observer {
    constructor(el, index) {
        var that = this
        this.keyIndex = index
        el.update =  function () {
            that.update.call(that,...arguments)
        }
        this.el = el
        return this
    }
    update(context, observer) {
        if(typeof context === 'number' && context === i){
            this.el.style.background = '#d00'
        }
        if(context instanceof Array){
            context.map(m => {
                if(m === observer.keyIndex){
                    this.el.style.background = '#d00'
                }
            })
        }

    }
    update2(context, observer) {

        this.el.style.background = '#fff'
    }
}

class RollCall extends Subject {
    constructor() {
        super()
        this.getObservers()
    }
    getObservers() {
        var lis = document.querySelectorAll('.my-li')
        var length = lis.length;
        for(var i = 0; i<= length -1 ;i++){
            this.addObserver(new Observer(lis[i], i))
        }
    }
}

