import {carStatus} from "../enum/carStatus.enum";

export interface Car {
  id: number;
  model: string;
  make: string;
  year: number;
  colour: string;
  status: carStatus;
}
