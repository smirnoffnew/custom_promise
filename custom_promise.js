class _Promise {
    constructor(promiseCallback){
        promiseCallback.call(this, this.resolve.bind(this), this.reject.bind(this));
        this.callBacks = [];
        this.isPending = true;
    }

    resolve(data){
        if (this.isPending){
            this.isPending = false;
            this.callBacks.forEach( (callBack, index, arr)=>{
                let arg = data;
                if (index > 1) arg = arr[index-1]();
                callBack.call(this, arg);
            })
        }
    }

    reject(errMsg){
        if (this.isPending){
            this.isPending = false;
            this.errCallback ? this.errCallback.call(this, errMsg) : null;
        }
    }

    then(callback, errCallback){
        this.callBacks.push(callback);
        errCallback ? this.errCallback = errCallback : null ;
        return this;
    }

    catch(errCallback) {
        this.errCallback = errCallback;
    }
}

let _promise = new _Promise((resolve, reject)=>{
    setTimeout( () => resolve('мы снова в деле'), 4000);
    setTimeout( () => reject('все сломалось'), 4700);
});

_promise
    .then( res=>console.log('1', res),  err=>console.log('1', err))
    .then( res=>console.log('2', res) )
    .then( res=>console.log('3', res) )
    .catch( res=>console.log('1', res) );



let promise = new Promise((resolve, reject)=>{
    setTimeout( () => resolve('мы снова в деле'), 2000);
    setTimeout( () => reject('все сломалось'), 3000);
});

promise
    .then( res=>console.log('1', res) )
    .then( res=>console.log('2', res) );