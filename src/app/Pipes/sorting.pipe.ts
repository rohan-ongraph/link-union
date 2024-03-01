import { Pipe, PipeTransform } from '@angular/core';
import { Data } from '../interfaces/auth';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(value: Data[], sortBy: string): Data[] {
    // Check if sortBy is empty or if the array is empty, return the original value
    if (sortBy === '' || value.length === 0) {
      return value;
    } else {
      // Perform sorting based on the specified criteria
      switch (sortBy) {
        case 'Name':
          // Sort alphabetically by name
          return value.slice().sort((a, b) => a.name.localeCompare(b.name));
        case 'Tag':
          // Sort alphabetically by the first tag (assuming tags array is not empty)
          return value.slice().sort((a, b) => {
            const tagA = a.tags[0].toLowerCase(); // Get first tag of object A
            const tagB = b.tags[0].toLowerCase(); // Get first tag of object B
            return tagA.localeCompare(tagB); // Compare tags alphabetically
          });
        default:
          // If sortBy doesn't match any criteria, return the original value
          return value;
      }
    }
  }
}
