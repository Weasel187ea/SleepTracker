import { Component, OnInit } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { SleepService } from '../services/sleep.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {
  public logSleepinessButton = [
		{
			text: 'Confirm',
			handler: () => { this.logSleepinessData() }
		},

		{
			text: 'Cancel',
			role: 'cancel',
			data: {
				action: 'cancel',
			},
		},

	];
  scale_choice: number = 0;
  scaleValues = StanfordSleepinessData.ScaleValues.slice(1);
  scaleValue:string = "";
  // photo: string = '';

  
  constructor(public sleepservice: SleepService, private alertController: AlertController) {
    console.log(this.scaleValues);
    console.log(this.scaleValue);
  }

  async ConfirmDelete(data:StanfordSleepinessData){
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
  
	async uploadPhoto(data: StanfordSleepinessData) {
		const image = await Camera.getPhoto({
			quality:80,
			allowEditing: false,
			resultType: CameraResultType.Uri,
      source: CameraSource.Photos
		});
		var imageUrl = image.webPath;
		data.photo = imageUrl || "";
	}

  onSelectChange(event: any) {
    const selectedValue = event.detail.value;
    this.incrementCounter(parseInt(selectedValue));
  }

  incrementCounter(operation: number) {

    switch (operation) {
      case (1):
        this.scale_choice = 1;
        break;
      case (2):
        this.scale_choice = 2;
        break;
      case (3):
        this.scale_choice = 3;
        break;
      case (4):
        this.scale_choice = 4;
        break;
      case (5):
        this.scale_choice = 5;
        break;
      case (6):
        this.scale_choice = 6;
        break;
      case (7):
        this.scale_choice = 7;
        break;
    }
  }

  logSleepinessData() {
    console.log(this.scaleValue);
    if (this.scale_choice == 0) {
      alert("Please select a value");
      return;
    }
    let new_sleep_data = new StanfordSleepinessData(this.scale_choice, new SleepData().loggedAt);
    console.log(new_sleep_data);
    this.sleepservice.logSleepinessData(new_sleep_data);

  }

  get AllSleepinessData() {
    return SleepService.AllSleepinessData;
  }


  ngOnInit() {

  }
  deleteLog(data: StanfordSleepinessData) {
    console.log(data);
    let index = this.AllSleepinessData.indexOf(data);
    if (index > -1) {
      this.AllSleepinessData.splice(index, 1);
    }
  }

}