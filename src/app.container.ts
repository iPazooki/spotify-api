import 'reflect-metadata'; // Import only once
import { container } from "inversify-props";
import ISpotifyService from "@/services/Interfaces/spotifyService";
import SpotifyService from "@/services/spotifyService";

export default function buildDependencyContainer(): void {
  container.addTransient<ISpotifyService>(SpotifyService);
}
