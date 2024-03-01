import {
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data, User } from '../interfaces/auth'; // Importing interfaces
import { MessageService, ConfirmationService } from 'primeng/api'; // Importing PrimeNG services
import { userService } from '../services/userService.service'; // Importing user service
import * as jspdf from 'jspdf'; // Importing jsPDF library

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html', // Template URL for component
  styleUrl: './link-list.component.css', // CSS file for component
})
export class LinkListComponent implements OnInit {
  visibleData: any; // Variable for visible data
  constructor(
    private fb: FormBuilder, // Form builder service
    private mssgService: MessageService, // Message service from PrimeNG
    private userService: userService, // User service
    private confirmationService: ConfirmationService // Confirmation dialog service
  ) {
    this.userId = sessionStorage.getItem('id'); // Getting user ID from session storage
  }
  data!: Data[]; // Variable for data
  filteredData!: Data[]; // Variable for filtered data
  userId: string | null = null; // Variable for user ID
  isLoading: boolean = false; // Flag for loading state

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('id'); // Getting user ID from session storage
    this.getuserdata(this.userId); // Fetching user data
  }

  filterby = ['Name', 'Tag']; // Filter options

  selectedFilter = ''; // Selected filter option

  view = false; // Flag for view dialog
  visible = false; // Flag for add bookmark dialog
  editView = false; // Flag for edit bookmark dialog

  desc!: string; // Description variable
  link!: string; // Link variable
  name!: string; // Name variable
  tags!: Array<string>; // Tags variable
  id!: number; // ID variable

  // Function to open view dialog
  viewDialog(item: Data) {
    this.view = !this.view; // Toggle view flag

    // Assigning item properties to variables
    this.name = item.name;
    this.desc = item.desc;
    this.link = item.link;
    this.tags = item.tags;

  }

  // Function to toggle add bookmark dialog
  addBookMark() {
    this.visible = !this.visible; // Toggle visible flag
  }

  // Form group for bookmark form
  bookMarkForm: FormGroup = this.fb.group({
    name: [
      '', // Name control
      [
        Validators.required, // Required validator
        Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/), // Pattern validator for alphabetic characters and spaces
        Validators.maxLength(50), // Maximum length validator
      ],
    ],
    link: [
      '', // Link control
      [
        Validators.required, // Required validator
        Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/), // Pattern validator for URL format
      ],
    ],
    desc: [''], // Description control
    tags: [
      '' // Tags control
    ],
  });

  idCounter: number = 0; // Counter for ID
  // Function to handle form submission
  onSubmit() {
    if (this.bookMarkForm.valid) {
      const newEntry: Data = {
        id: this.idCounter++, // Incrementing ID counter
        name: this.bookMarkForm.value.name, // Getting name from form
        link: this.bookMarkForm.value.link, // Getting link from form
        desc: this.bookMarkForm.value.desc, // Getting description from form
        tags: this.bookMarkForm.value.tags, // Getting tags from form
      };

      if (this.userId) {
        // Calling service to set user data
        this.userService.setUserData(newEntry, this.userId).subscribe({
          next: (response) => {
            // Adding success message
            this.mssgService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'New entry added successfully',
            });
            // Reset form and hide the dialog
            this.bookMarkForm.reset();
            this.getuserdata(this.userId); // Fetch updated user data
            this.visible = !this.visible; // Toggle visible flag
          },
          error: (error) => {
            // Adding error message
            this.mssgService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to add new entry',
            });
          },
        });
        this.visible = !this.visible; // Toggle visible flag
      }
    } else {
      // Adding error message if form is invalid
      this.mssgService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Something went wrong',
      });
    }
    this.visible = !this.visible; // Toggle visible flag
  }

  edId!: number; // ID for editing
  editName!: string; // Name for editing
  editLink!: string; // Link for editing
  editDesc!: string; // Description for editing
  editTags!: Array<string>; // Tags for editing

  // Function to open edit dialog
  onEdit(editItem: Data) {
    this.editView = !this.editView; // Toggle edit view flag

    // Assigning item properties to variables
    this.edId = editItem.id;
    this.editName = editItem.name;
    this.editLink = editItem.link;
    this.editDesc = editItem.desc;
    this.editTags = editItem.tags;
  }

  // Function to handle edit changes
  onEditChanges() {
    const editedItem: Data = {
      id: this.edId, // Assigning edited ID
      name: this.editName, // Assigning edited name
      link: this.editLink, // Assigning edited link
      desc: this.editDesc, // Assigning edited description
      tags: this.editTags, // Assigning edited tags
    };

    if (this.userId) {
      // Fetching user data to update
      this.userService.getUserData(this.userId).subscribe({
        next: (userData: any) => {
          // Update the list.data array with the edited item
          const updatedList = userData.list.data.map((item: Data) => {
            if (item.id === editedItem.id) {
              return editedItem; // Replace the edited item
            } else {
              return item; // Keep other items unchanged
            }
          });

          // Construct the updated user data object
          const updatedUserData = {
            ...userData,
            list: {
              data: updatedList,
            },
          };

          if (this.userId) {
            // Send the updated user data to the server
            this.userService
              .updateUserData(this.userId, updatedUserData)
              .subscribe({
                next: (response) => {
                  // Adding success message
                  this.mssgService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Data updated successfully',
                  });
                  this.editView = !this.editView; // Toggle edit view flag
                  this.getuserdata(this.userId); // Fetch updated user data
                  this.bookMarkForm.reset(); // Reset form
                },
                error: (error) => {
                  // Adding error message
                  this.mssgService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to update data',
                  });
                },
              });
          }
        },
        error: (error) => {
          // Adding error message
          this.mssgService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to fetch user data',
          });
        },
      });
    }
  }

  // Function to handle delete operation
  onDelete(delItem: Data) {
    if (this.userId) {
      // Fetching user data to delete
      this.userService.getUserData(this.userId).subscribe({
        next: (userData: any) => {
          // Update the list.data array with the edited item
          const updatedList = userData.list.data.filter(
            (item: Data) => delItem.id !== item.id
          );

          // Construct the updated user data object
          const updatedUserData = {
            ...userData,
            list: {
              data: updatedList,
            },
          };

          if (this.userId) {
            // Send the updated user data to the server for deletion
            this.userService
              .deleteUserData(this.userId, updatedUserData)
              .subscribe({
                next: (response) => {
                  // Adding success message
                  this.mssgService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Data deleted successfully',
                  });
                  this.getuserdata(this.userId); // Fetch updated user data
                },
                error: (error) => {
                  // Adding error message
                  this.mssgService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to delete data',
                  });
                },
              });
          }
        },
        error: (error) => {
          // Adding error message
          this.mssgService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to fetch user data',
          });
        },
      });
    }
  }

  // Function to delete all data
  onDeleteAll() {
    if (this.userId) {
      // Delete all user data
      this.userService.deleteAllUserData(this.userId).subscribe({
        next: () => {
          this.getuserdata(this.userId); // Fetch updated user data
        },
      });
    }
  }

  // Function to handle cancel operation
  onCancel() {
    this.bookMarkForm.reset(); // Reset form
    this.editView = false; // Close edit view dialog
  }

  searchText!: string; // Variable for search text
  // Function to filter data based on search text
  filterData(): void {
    if (this.searchText.trim() === '') {
      this.filteredData = [...this.data];
    } else {
      const searchTerm = this.searchText.toLowerCase().trim();
      this.filteredData = this.data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.tags.toString().toLowerCase().includes(searchTerm)
      );
    }
  }

  // Function to show confirmation dialog before deleting all data
  confirm() {
    this.confirmationService.confirm({
      header: 'Confirmation', // Dialog header
      message: 'Please confirm to Delete all saved links.', // Confirmation message
      icon: 'pi pi-exclamation-triangle', // Icon for confirmation dialog
      acceptButtonStyleClass: 'p-button-danger p-button-text', // CSS class for accept button
      rejectButtonStyleClass: 'p-button-text p-button-text', // CSS class for reject button
      acceptIcon: 'none', // Hide accept button icon
      rejectIcon: 'none', // Hide reject button icon
      accept: () => {
        if (this.data.length > 0) {
          // If data exists
          this.mssgService.add({
            severity: 'Success', // Severity of message
            summary: 'Success', // Summary of message
            detail: 'All data deleted', // Detail message
            life: 3000, // Time duration to display message
          });
          this.onDeleteAll(); // Delete all data
        }
      },
      reject: () => {}, // No action on reject
    });
  }

  // Function to fetch user data
  getuserdata(userId: any) {
    if (userId) {
      // If user ID exists
      // Fetch user data from service
      this.userService.getUserData(userId).subscribe({
        next: (userData: User) => {
          // Success callback
          this.data = userData.list.data; // Assigning user data
          this.filteredData = [...this.data]; // Assigning filtered data
          // Initialize visibleData if needed
          if (this.data && this.data.length > 0) {
            // If data exists
            // Find the maximum ID in the existing data and set idCounter accordingly
            this.idCounter =
              Math.max(...this.data.map((entry) => entry.id)) + 1;
          } else {
            this.idCounter = 0; // If no data, reset counter
          }
        },
      });
    }
  }

  // Function to generate PDF from data
  generatePDF(): void {
    // Create a new jsPDF instance with landscape orientation and 'mm' as the unit of measurement
    const pdf = new jspdf.jsPDF('l', 'mm');

    // Set initial y position and page margin
    let yPos = 20;
    const pageMargin = 20;

    // Iterate over each item in the data
    this.data.forEach((item) => {
      // Add name
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Name:', pageMargin, yPos);
      pdf.setFont('helvetica', 'normal');
      yPos = this.addWrappedText(pdf, item.name, pageMargin + 30, yPos, 170); // Adjusted width for wrapped text

      // Add link
      // yPos += 10; // Increase yPos to create space between items
      pdf.setFont('helvetica', 'bold');
      pdf.text('Link:', pageMargin, yPos);
      pdf.setTextColor(0, 0, 255); // Set text color to blue
      pdf.setFont('helvetica', 'normal');
      yPos = this.addWrappedText(pdf, item.link, pageMargin + 30, yPos, 170); // Adjusted width for wrapped text
      pdf.setTextColor(0);

      // Add description
      // yPos += 10; // Increase yPos to create space between items
      pdf.setFont('helvetica', 'bold');
      pdf.text('Description:', pageMargin, yPos);
      pdf.setFont('helvetica', 'normal');
      yPos = this.addWrappedText(pdf, item.desc, pageMargin + 30, yPos, 170); // Adjusted width for wrapped text
      yPos += 10;

      // Move to next item
      yPos += 10; // Increase yPos to create space between items
      if (yPos >= pdf.internal.pageSize.height - pageMargin) {
        // If yPos exceeds page height, add a new page
        pdf.addPage();
        yPos = pageMargin;
      }
    });

    // Save the PDF
    pdf.save('data.pdf');
  }

  // Function to add wrapped text to PDF
  addWrappedText(pdf: any, text: string, x: number, y: number, maxWidth: number): number {
    const lineHeight = pdf.getLineHeight();
    const splitText = pdf.splitTextToSize(text, maxWidth);
    pdf.text(splitText, x, y);
    return y + splitText.length * lineHeight;
  }
}
