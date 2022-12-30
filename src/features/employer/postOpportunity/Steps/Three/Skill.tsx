import React from 'react';
import Select, { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { isEmpty, debounce, map } from 'lodash';
import { matchSorter } from 'match-sorter';
import { Control, Controller, useFieldArray, UseFormRegister } from 'react-hook-form';
import plusImg from 'assets/images/btn-plus.svg';
import minusImg from 'assets/images/btn-minus.svg';
import { createOption, OptionType, selectStyle } from 'features/employer/common';
import { OpportunityStepThree } from '../../postOpportunitySlice';
import { ListSkills } from 'features/admin/skill/skillAPI';

const levels = [
  { value: 'Expert', label: 'Expert' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Beginner', label: 'Beginner' },
];
let getpersSkillTitles: readonly OptionType[] = [];
let getTechSkillTitles: readonly OptionType[] = [];
let getPubSkillTitles: readonly OptionType[] = [];
const getSkillData = async (skillType: string) => {
  const { data } = await ListSkills();
  if (skillType == "personal_skills") {
    data.items = data.items.filter((item: any) => item.type == "personal")
    getpersSkillTitles = map(data.items, ({ name }) => createOption(name));
  } else if (skillType == "technical_skills") {
    data.items = data.items.filter((item: any) => item.type == "technical")
    getTechSkillTitles = map(data.items, ({ name }) => createOption(name));
  } else {
    data.items = data.items.filter((item: any) => item.type == "public")
    getPubSkillTitles = map(data.items, ({ name }) => createOption(name));
  }
};
interface Props {
  errors: any;
  control: Control<OpportunityStepThree, Record<string, any>>;
  register: UseFormRegister<OpportunityStepThree>;
  skillType: string;
}

const Skill: React.FC<Props> = ({ control, register, errors, skillType }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: skillType == "personal_skills" ? 'skills.personal_skills' : skillType == "technical_skills" ? 'skills.technical_skills' : 'skills.public_skills',
  });

  const [optionCount, setOptionCount] = React.useState<number>(1);
  const [skillTitle, setskillTitle] = React.useState<OptionType[]>();
  React.useEffect(() => {
    getSkillData(skillType)
  }, []);
  const loadSkillPersTitles = debounce((value: string, callback) => {
    const options = matchSorter(getpersSkillTitles, value, { keys: ['label'] });
    callback(isEmpty(options) ? [] : options);
  }, 500);
  const loadSkillTechTitles = debounce((value: string, callback) => {
    const options = matchSorter(getTechSkillTitles, value, { keys: ['label'] });
    callback(isEmpty(options) ? [] : options);
  }, 500);
  const loadSkillPubTitles = debounce((value: string, callback) => {
    const options = matchSorter(getPubSkillTitles, value, { keys: ['label'] });
    callback(isEmpty(options) ? [] : options);
  }, 500);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    if (index === 0) {
      append({ title: '', level: '' });
      setOptionCount(optionCount + 1);
    } else {
      remove(index);
      setOptionCount(optionCount - 1);
    }
  };
  React.useEffect(() => {
    let newOptions: OptionType[] = []
    fields.map(item => {
      newOptions.push(createOption(item.title))
    })
    if (!isEmpty(newOptions)) {
      setskillTitle(newOptions)
    }
  }, [])

  return (
    <div className='form-group col-sm-12'>
      <label className='label fw-600 mb-2 w-100'>
        {skillType.split("_").join(" ").toUpperCase()}<span className='note fw-400'>(upto 4 allowed)</span>
      </label>
      {fields.map((field, index) => {
        if (optionCount <= 4) {
          if (skillType == "personal_skills" || skillType == "technical_skills" || skillType == "public_skills") {
            return (
              <div className='form-group form-row mb-2' key={field.id}>
                <div className='col-3'>
                  <label className='label'>Skills Name</label>
                  {/* <input
                    type='text'
                    className='form-control'
                    placeholder='Name'
                    {...register(`skills.${skillType}.${index}.title` as const)}
                  /> */}
                  <Controller
                    control={control}
                    name={`skills.${skillType}.${index}.title`}
                    render={({ field: { onChange, value, name } }) => {
                      // if (!skillTitle) {

                      //   setskillTitle(createOption(value))

                      // }
                      // console.log(value, name, skillTitle);
                      // console.log("load", loadSkillTitles);
                      // console.log("data", getSkillTitles);



                      const handleOnchange = (option: SingleValue<OptionType>) => {
                        let titles: OptionType[] = skillTitle ? skillTitle : []
                        titles[index] = option ? option : { label: "", value: "" }
                        setskillTitle([...titles])
                        onChange(option?.value);
                      }
                      const handleInputChange = (inputValue: any) => {

                        console.log(inputValue);

                        setskillTitle(inputValue);
                      }
                      return (
                        <AsyncSelect
                          isClearable
                          name={name}
                          isSearchable={true}
                          styles={selectStyle}
                          value={skillTitle && skillTitle[index]}
                          // value={getSkillTitles.find((c) => c.value == value)}
                          onChange={handleOnchange}
                          // inputValue={value}
                          // onInputChange={handleInputChange}
                          loadOptions={skillType == "personal_skills" ? loadSkillPersTitles : skillType == "technical_skills" ? loadSkillTechTitles : loadSkillPubTitles}
                          placeholder='Name'
                          components={{ DropdownIndicator: null }}
                          defaultOptions
                        />
                      );
                    }}
                  />
                  {errors.skills && errors.skills[skillType][index] && errors.skills[skillType][index].title && (
                    <div className='text-danger error mt-1'>{errors.skills[skillType][index].title?.message}</div>
                  )}
                </div>
                <div className='col-3'>
                  <label className='label'>Proficiency Level</label>
                  <Controller
                    control={control}
                    name={`skills.${skillType}.${index}.level`}
                    render={({ field: { onChange, value, name } }) => {
                      const handleOnchange = (option: SingleValue<OptionType>) =>
                        onChange(option?.value);
                      return (
                        <Select
                          name={name}
                          isSearchable
                          options={levels}
                          styles={selectStyle}
                          onChange={handleOnchange}
                          placeholder='Select Proficiency Level'
                          components={{ IndicatorSeparator: () => null }}
                          value={levels.find((c) => c.value === value)}
                        />
                      );
                    }}
                  />
                  {errors.skills && errors.skills[skillType][index] && errors.skills[skillType][index].level && (
                    <div className='text-danger error mt-1'>
                      {errors.skills[skillType][index].level?.message}
                    </div>
                  )}
                </div>
                <div className='col-1'>
                  <label className='label'>&nbsp;</label>
                  <button
                    type='submit'
                    className='btn btn-plus-minus'
                    onClick={(event) => handleClick(event, index)}
                    disabled={index === 0 && optionCount === 4}
                  >
                    <img src={index === 0 ? plusImg : minusImg} height='38' alt='' />
                  </button>
                </div>
              </div>
            );
          }
        }
        return null;
      })}
    </div>
  );
};

export default Skill;
