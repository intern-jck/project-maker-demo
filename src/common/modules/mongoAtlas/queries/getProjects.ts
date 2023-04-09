import connectMongo from '@/common/modules/mongoAtlas/connectMongo';
// import ProjectModel from '@/common/modules/mongoAtlas/ProjectModel';

export default async function getProjects() {
  console.log('get projects')
  // connectMongo();
  // console.log(ProjectModel)
  // return;
  try {
    const connection = await connectMongo();
    // const projects = await ProjectModel.find().exec();
    // console.log(projects)
    return true;
  } catch (error) {
    console.error('Mongo find', error)
    return error;
  }
}