import Profile from './Profile';
import EducationSection from './Education/EducationSection';
import ExperienceSection from './Experience/ExperienceSection';
import SkillSection from './Skill/SkillSection';
import ProjectSection from './Project/ProjectSection';

function ProfileLayout() {
  return (
    <>
      <Profile />
      <div  className='container mx-auto mb-3' >
        <div className='flex flex-row justify-around' > 
          <EducationSection/>
          <ExperienceSection/>
        </div>
      </div>
      <div className='container mx-auto mb-3'>
        <SkillSection></SkillSection>
      </div>
      <div className='container mx-auto mb-3'>
        <ProjectSection></ProjectSection>
      </div>

    </>
  );
}

export default ProfileLayout;