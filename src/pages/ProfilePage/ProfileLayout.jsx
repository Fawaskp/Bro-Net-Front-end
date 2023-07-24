import NavBar from '../../components/Navbar';
import Profile from './Profile';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import SkillSection from './SkillSection';
import ProjectSection from './ProjectSection';

function ProfileLayout() {

  return (
    <>
     <NavBar/> 
      <Profile/>
      <div className='container mx-auto mb-3' >
        <div className='flex flex-row justify-around' > 
          <EducationSection/>
          <ExperienceSection/>
        </div>
      </div>
      <div className='max-w-screen-xl mx-auto mb-3' >
        <SkillSection></SkillSection>
      </div>
      <div className='max-w-screen-xl mx-auto mb-3' >
        <ProjectSection></ProjectSection>
      </div>
    </>
  );
}

export default ProfileLayout;