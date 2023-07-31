import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsString()
  albumId: string | null; // refers to Album

  @IsNotEmpty()
  @IsInt()
  duration: number; // integer number
}
