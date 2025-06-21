import { BadRequestException, Injectable } from '@nestjs/common';

import { GenerateDto } from '@Src/dto/generate.dto';
import { CombinationRepository } from '@Src/modules/combination/combination.repository';

interface ItemObject {
  type: string;
  value: string;
}

/** Original code by: davmik2601, */
/** For: */
/** ------------------------------------------------------------------------------------
      ** * *    **     **     **     **          **          ** * * *    **      **
    **          **   **       **     **          **          **            **  **
       **       ** **         **     **          **          ** * * *        **
          **    **    **      **     **          **          **            **  **
    * * **      **      **    **     ** * * *    ** * * *    ** * * *    **       **
 ---------------------------------------------------------------------------------------- */

@Injectable()
export class CombinationService {
  constructor(private readonly combinationRepository: CombinationRepository) {}

  async generate({ items, length: combLength }: GenerateDto) {
    /* for this test-task -->
     * check if the length of items is more than 26 (English alphabet letters count) */
    if (items.length > 26) {
      throw new BadRequestException(
        'The number of items must not exceed 26 ' +
          '(English alphabet letters count) for this test-task.',
      );
    }

    // generate elements from items with type as a letter prefix
    // and value as a letter with a number suffix
    // example: [{type: 'A', value: 'A1'}, {type: 'A', value: 'A2'}, {type: 'B', value: 'B1'}, ...]
    // -------------------------------------------------------------------------
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const elements: ItemObject[] = [];

    items.forEach((count, i) => {
      const letter = alphabet[i];
      for (let j = 1; j <= count; j++) {
        elements.push({ type: letter, value: `${letter}${j}` });
      }
    });
    // _________________________________________________________________________

    const combinations: string[][] = [];

    // filling method (recursive function) for generating combinations
    const filling = (start: number, current: ItemObject[]) => {
      if (current.length === combLength) {
        combinations.push(current.map((el) => el.value));
        return;
      }

      for (let i = start; i < elements.length; i++) {
        const candidate = elements[i];
        // check if the candidate type (letter) already exists in the current combination
        if (current.some((el) => el.type === candidate.type)) {
          continue;
        }
        filling(i + 1, [...current, candidate]);
      }
    };

    filling(0, []);

    // inserting combination into the database
    const createdCombination =
      await this.combinationRepository.insertAndReturn(combinations);

    return {
      combinationsCount: createdCombination.combinations.length,
      ...createdCombination,
    };
  }
}
