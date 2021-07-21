import { v4 } from 'uuid';
import validate from 'uuid-validate';

import { InvalidArgumentError } from '@shared/domain/Errors/InvalidArgumentError';

export class UUID {
    readonly value: string;
  
    constructor(value: string) {
      this.ensureIsValidUuid(value);
  
      this.value = value;
    }
  
    static random(): UUID {
      return new UUID(v4());
    }
  
    private ensureIsValidUuid(id: string): void {
      if (!validate(id)) {
        throw new InvalidArgumentError('Not UUID valid value!');
      }
    }
  
    toString(): string {
      return this.value;
    }
  }