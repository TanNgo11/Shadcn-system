export interface BuildingCreationRequest {
  code: string;
  name: string;
  defaultNumberOfRooms: number;
  defaultCapacityOfRooms: number;
}

export interface BuildingUpdateRequest {
  code?: string;
  name?: string;
  defaultNumberOfRooms?: number;
  defaultCapacityOfRooms?: number;
}

export interface BuildingResponse {
  id: number;
  code: string;
  name: string;
  rooms: RoomResponse[];
}

export interface RoomCreationRequest {
  code: string;
  name: string;
  capacity: number;
  roomType: RoomType;
}

export interface RoomUpdateRequest {
  code?: string;
  name?: string;
  capacity?: number;
  roomType?: RoomType;
}

export interface RoomResponse {
  id?: number;
  code: string;
  name: string;
  capacity: number;
  roomType: RoomType;
  status: RoomStatus;
  buildingCode: string;
}

export enum RoomType {
  CLASSROOM = 'CLASSROOM',
  LABORATORY = 'LABORATORY',
  OFFICE = 'OFFICE',
  AUDITORIUM = 'AUDITORIUM',
  CONFERENCE_ROOM = 'CONFERENCE_ROOM',
  STUDY_ROOM = 'STUDY_ROOM',
  OTHER = 'OTHER',
}

export enum RoomStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
  RESERVED = 'RESERVED',
  UNAVAILABLE = 'UNAVAILABLE',
}