import Artist from "@/model/artist";

export default class Song {
  constructor(
    public id: string,
    public title: string,
    public imageUrl: string,
    public artist: Artist,
    public playedDate: Date
  ) {}
}
