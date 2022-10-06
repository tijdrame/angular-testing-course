import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe('Async Testing Examples', () => {
    it('Asynchronous test example with Jasmine done()', ((done: DoneFn) => {
        let test = false;
        setTimeout(() => {
            console.log('running assertions');
            test = true;
            expect(test).toBeTruthy();
            done();
        }, 1000);
    }));

    it('Asynchronous test example - setTimeOut()', fakeAsync(() => {
        let test = false;
        setTimeout(() => {
            console.log('running assertions setTimeOut');
            test = true;
        }, 1000);
        //tick(1000);//seulement dans 1 fakeAsync pour donner du temps au 
        // setTimeout de s'exec
        flush();//pas d'arg mais s'assure aussi que ts les async st done
        expect(test).toBeTruthy();//ça marche car on estsur kil est dejà setter

    }));
    it('Asynchronous test example - plain promise', fakeAsync(() => {
        let test = false;
        console.log('Creating  promise');
        Promise.resolve().then(()=>{
            console.log('Promise evaluated successfully');
            test = true;
        });
        flushMicrotasks();//Promise est un micro task
        //setTimeOut est un macro task
        console.log('Running test assertions');

        expect(test).toBeTruthy();

    }));

    it('Asynchronous test example - Promise + setTimeOut', fakeAsync(()=>{
        let counter = 0;
        Promise.resolve().then(() =>{
            counter += 10;
            setTimeout(() =>{
                counter += 1;
            }, 1000);
        })
        expect(counter).toBe(0);
        flushMicrotasks();//pour le promise
        expect(counter).toBe(10);
        flush();//pour le timeout
        expect(counter).toBe(11);
    }));

    it('Asynchronous test example - Observables', fakeAsync(() =>{
        let test = false;
        console.log('Creating  Observable');
        const test$ = of(test).pipe(delay(1000));
        test$.subscribe(() =>{
            test = true;
        });
        tick(1000);
        console.log('Running test assertions');
        expect(test).toBe(true);
    }));
})