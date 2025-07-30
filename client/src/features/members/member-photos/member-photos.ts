import { Component, inject } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from '../../../types/member';
import { AsyncPipe } from '@angular/common';
import { ImageUpload } from '../../../shared/image-upload/image-upload';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe, ImageUpload],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos {
  protected memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  protected photos$?: Observable<Photo[]>;

  constructor() {
    const id = this.route.parent?.snapshot.paramMap.get('id');
    if (id) {
      this.photos$ = this.memberService.getMemberPhotos(id);
    }
  }
}
