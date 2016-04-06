import {Page} from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    
    tasks: FirebaseListObservable<any[]>;
    
    constructor(af: AngularFire){
        this.tasks = af.list('/tasks');
    } 
    
    addTask(task : HTMLInputElement): void {
    
        console.log(`Adding article title: ${task.value} `);        
        this.tasks.add(task.value);
    }
    
    removeTask(id){
        this.tasks.remove(id);
    }
    
    
    
}
