export class Challenge {
  constructor(id,title,daysInfo,startDate,endDate,createdAt,isProgress,nickname){
    this.id = id;
    this.title = title;
    this.daysInfo = daysInfo;
    this.startDate = startDate;
    this.endDate = endDate;
    this.createdAt = createdAt;
    this.isProgress = isProgress;
    this.nickname = nickname;
  }
}