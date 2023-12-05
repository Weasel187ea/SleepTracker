import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	public logSleepButton = [
		{
			text: 'Confirm',
			handler: () => { this.logSleepData() }
		},

		{
			text: 'Cancel',
			role: 'cancel',
			data: {
				action: 'cancel',
			},
		},

	];

	//   public ConfirmDelete = [
	// 	{
	// 		text: 'Confirm',
	// 		role: 'destructive',
	// 		handler: (data: OvernightSleepData) => { this.deleteLog(data) } 
	// 	},

	// 	{
	// 	  text: 'Cancel',
	// 	  role: 'cancel',
	// 	  data: {
	// 		action: 'cancel',
	// 	  },
	// 	},

	//   ];
	constructor(public sleepService: SleepService, private alertController: AlertController) {
	}

	async ConfirmDelete(data:OvernightSleepData){
        const alertbutton = await this.alertController.create({
            header: "Delete Log?",
            buttons: [
                {
                text: "Confirm",
                role: "destructive",
                handler: () => {
                    this.deleteLog(data);
                }
            },

            {
                text: 'Cancel',
                role: 'cancel',
            }
            ]
        });
        await alertbutton.present();
    }

	sleepTime = moment().format();
	wakeTime = moment().format();

	logSleepData() {
		console.log("Sleeptime:", this.sleepTime);
		const startDate = new Date(this.sleepTime);
		const endDate = new Date(this.wakeTime);
		console.log("startDate:", startDate);
		console.log("endDate:", endDate);
		console.log("this is the sleep data", this.allSleepData);
		
		if (startDate >= endDate) {
			alert("Invalid time input");
			return;
		}
		console.log("Sleeptime:", this.sleepTime);

		this.sleepService.logOvernightData(
			new OvernightSleepData(
				new Date(this.sleepTime),
				new Date(this.wakeTime)
			)
		);
		// console.log("look here", this.sleepService);
	}

	deleteLog(data: OvernightSleepData) {
		// Remove this data from the AllSleepData array
		this.allOvernightData.splice(this.allOvernightData.indexOf(data), 1);
	}

	ngOnInit() {

		console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	get allOvernightData() {
		return SleepService.AllOvernightData;
	}



}
