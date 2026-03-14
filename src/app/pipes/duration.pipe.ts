import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'duration',
    standalone: true
})
export class DurationPipe implements PipeTransform {

    transform(value: number): string {
        if (value == null || value < 0) {
            return '0:00';
        }

        const totalSeconds = Math.floor(value);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const paddedSeconds = seconds.toString().padStart(2, '0');

        if (hours > 0) {
            const paddedMinutes = minutes.toString().padStart(2, '0');
            return `${hours}:${paddedMinutes}:${paddedSeconds}`;
        }

        return `${minutes}:${paddedSeconds}`;
    }
}
