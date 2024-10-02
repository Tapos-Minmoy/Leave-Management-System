import {
  calc_bill_questionSetting_honours_v2019,
  calc_bill_questionSetting_tutorial_v2019,
  calc_bill_answerscriptExamining_honours_v2019,
  calc_bill_answerscriptExamining_tutorial_v2019,
  calc_bill_answerscriptExamining_laboratory_v2019,
  calc_bill_answerscriptExamining_scrutiny_v2019,
  calc_bill_answerscriptExamining_mphil_phd_v2019,
  calc_bill_answerscriptExamining_terminal_v2019,
  calc_bill_laboratoryExamination_v2019,
  calc_bill_laboratoryNotebookExamining_v2019,
  calc_bill_vivaExam_honours_v2019,
  calc_bill_vivaExam_masters_v2019,
  calc_bill_industrialTour_v2019,
  calc_bill_projectReport_v2019,
  calc_bill_mastersThesis_v2019,
  calc_bill_honorsThesisGuide_supervision_v2019,
  calc_bill_masterThesisGuide_supervision_v2019,
  calc_bill_mphilThesisGuide_supervision_v2019,
  calc_bill_phdThesisGuide_supervision_v2019,
  calc_bill_tabulation_1st_to_3rd_year_v2019,
  calc_bill_tabulation_4th_year_v2019,
  calc_bill_handquestionPaperWriting_v2019,
  calc_bill_computerquestionPaperWriting_v2019,
  calc_bill_handquestionPaperPhotocopy_v2019,
  calc_bill_computerquestionPaperPhotocopy_v2019,
  calc_bill_gradesheetWriting_1st_to_3rd_year_v2019,
  calc_bill_gradesheetWriting_4th_year_v2019,
} from "./exam_bill_calculation_functions";
import { Bill_Calculation } from "./types";

const exam_bill_calculation_rules: Record<
  number,
  Record<number, Array<{ startDate: Date; rule: Bill_Calculation }>>
> = {
  // Question setting
  1: {
    // honours
    10: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_questionSetting_honours_v2019
      }
    ],
    2: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_questionSetting_tutorial_v2019
      }
    ]
  },
  4: {
    10: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_answerscriptExamining_honours_v2019
      }
      
    ],
    2: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_answerscriptExamining_tutorial_v2019
      }
    ],
    3: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_answerscriptExamining_laboratory_v2019
      }
    ],
    4: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_answerscriptExamining_scrutiny_v2019
      }
    ],
    22: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_answerscriptExamining_mphil_phd_v2019
      }
    ],
    20: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_answerscriptExamining_terminal_v2019
      }
    ]
  },
  5: {
    3: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_laboratoryExamination_v2019
      }
    ]
  },
  6: {
    10: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_vivaExam_honours_v2019
      }
    ],
    13: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_vivaExam_masters_v2019
      }
    ]
  },
  7: {
    7: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_laboratoryNotebookExamining_v2019
      }
    ],
    5: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_industrialTour_v2019
      }
    ],
    13: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_mastersThesis_v2019
      }
    ],
    21: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_projectReport_v2019
      }
    ]
  },
  8: {
    17: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_honorsThesisGuide_supervision_v2019
      },
    ],
    9: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_masterThesisGuide_supervision_v2019
      },
    ],
    11: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_mphilThesisGuide_supervision_v2019
      },
    ],
    12: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_phdThesisGuide_supervision_v2019
      },
    ]
  },
  9: {
    16: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_tabulation_1st_to_3rd_year_v2019
      }
    ],
    17: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_tabulation_4th_year_v2019
      }
    ],
  },
  10: {
    19: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_handquestionPaperWriting_v2019
      }
    ],
    18: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_computerquestionPaperWriting_v2019
      }
    ],
  },
  11: {
    19: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_handquestionPaperPhotocopy_v2019
      }
    ],
    18: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_computerquestionPaperPhotocopy_v2019
      }
    ],
  },
  12: {
    16: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_gradesheetWriting_1st_to_3rd_year_v2019
      }
    ],
    17: [
      {
        startDate: new Date("2020-01-01"),
        rule: calc_bill_gradesheetWriting_4th_year_v2019
      }
    ],
  },
  13: {
    
  }
};

export { exam_bill_calculation_rules };
