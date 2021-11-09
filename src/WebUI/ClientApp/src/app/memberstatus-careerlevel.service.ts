import { Injectable } from '@angular/core';
import {
  ICareerLevelLookupDto,
  IMemberStatusLookupDto,
  MemberStatusClient,
  CareerLevelClient,
} from 'src/app/membermanager-api';

@Injectable({
  providedIn: 'root',
})
export class MemberstatusCareerlevelService {
  memberStatus: IMemberStatusLookupDto[] | null = null;
  careerLevels: ICareerLevelLookupDto[] | null = null;
  constructor(
    protected statusApi: MemberStatusClient,
    protected careerLevelClient: CareerLevelClient
  ) {}

  isLoaded(): boolean {
    return this.memberStatus !== null && this.careerLevels !== null;
  }

  async doLoad(
    forceRefresh: boolean = false
  ): Promise<[IMemberStatusLookupDto[], ICareerLevelLookupDto[]]> {
    if (forceRefresh || !this.isLoaded()) {
      const [rawStatus, rawLevels] = await Promise.all([
        this.statusApi.get().toPromise(),
        this.careerLevelClient.get().toPromise(),
      ]);
      this.memberStatus = rawStatus.memberStatus;
      this.careerLevels = rawLevels.careerLevels;
    }
    return [this.memberStatus, this.careerLevels];
  }
}
