import {Component} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry,} from 'ngx-file-drop';
import {VideoService} from '../service/video.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-upload-video',
    templateUrl: 'upload-video.component.html',
    styleUrls: ['upload-video.component.css'],
    standalone: false
})
// export class UploadVideoComponent {
//   public files: NgxFileDropEntry[] = [];
//   fileUploaded: boolean = false;
//   fileEntry: FileSystemFileEntry | undefined;
//
//   constructor(private videoService: VideoService, private  router: Router) {
//
//   }
//
//   public dropped(files: NgxFileDropEntry[]) {
//     this.files = files;
//     for (const droppedFile of files) {
//       if (droppedFile.fileEntry.isFile) {
//         this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
//         this.fileEntry.file((file: File) => {
//           console.log(droppedFile.relativePath, file);
//           this.fileUploaded = true;
//         });
//       } else {
//         const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
//         console.log(droppedFile.relativePath, fileEntry);
//       }
//     }
//   }
//
//   public fileOver(event: any) {
//     console.log(event);
//   }
//
//   public fileLeave(event: any) {
//     console.log(event);
//   }
//
//   public uploadVideo() {
//     if (this.fileEntry !== undefined) {
//       this.fileEntry.file(file => {
//         this.videoService.uploadVideo(file).subscribe(data => {
//           this.router.navigateByUrl("/save-video-details/"+data.videoId);
//         })
//       })
//     }
//   }
// }
export class UploadVideoComponent {
    fileUploaded = false;
    fileName = '';
    selectedFile?: File;

    constructor(private videoService: VideoService, private router: Router) {

    }
    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            this.fileName = file.name;
            this.fileUploaded = true;
        }
    }

    uploadVideo() {
        if (!this.selectedFile) return;

        this.videoService.uploadVideo(this.selectedFile).subscribe(data => {
            this.router.navigateByUrl(`/save-video-details/${data.videoId}`);
        });
    }
}

