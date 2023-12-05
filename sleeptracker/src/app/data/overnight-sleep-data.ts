import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	private sleepStart:Date;
	private sleepEnd:Date;

	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
	}

	override summaryString():string {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes.";
	}

	override dateString():string {
		return "Night of " + this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}
	
	get sleepStartDateString():string {
		return this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}

	get sleepEndDateString():string {
		return this.sleepEnd.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}
	get sleepStartString():string {
		return this.sleepStart.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
	}

	get sleepEndString():string {
		return this.sleepEnd.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
	}
}
