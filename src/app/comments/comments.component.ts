import { Component, Input } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  imports: [
    MatIcon,
    MatButton,
    MatIconButton,
    NgIf,
    NgForOf,
  ],
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() videoId!: string;

  focused = false;

  comments = [
    {
      user: 'Ahmed Ali',
      time: '2 hours ago',
      text: 'This video is amazing 🔥',
      likes: 120
    },
    {
      user: 'Sara Mohamed',
      time: '1 day ago',
      text: 'Very helpful explanation, thanks!',
      likes: 45
    }
  ];

  cancel() {
    this.focused = false;
  }
}
