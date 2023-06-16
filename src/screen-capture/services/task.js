import axios from 'axios'

export async function createSubtask(data) {
  return await axios.post('https://api.upm.udevs.io/subtask', {
    epic_id: process.env.NEXT_PUBLIC_EPIC_ID,
    project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
    stage_id: process.env.NEXT_PUBLIC_STAGE_ID,
    stage_title: 'Frontend',
    status_id: '295bb51a-0026-459a-8070-dd8e773f90e0',
    task_id: process.env.NEXT_PUBLIC_TASK_ID,
    task_title: 'UI bugs',
    title: 'UI bug',
    description: 'description',
    ...data
  })
}

export async function createSubtaskItem(data) {
  return await axios.post('https://api.upm.udevs.io/sprint/subtask_items', {
    ...data,
    subtask_title: 'bug',
    project_sprint_step_id: process.env.NEXT_PUBLIC_SPRINT_STEP_ID,
    sprint_id: process.env.NEXT_PUBLIC_SPRINT_ID,
    subtask_id: data.id
  })
}

export async function createSubtaskFile(data, id) {
  return await axios.post('https://api.upm.udevs.io/subtask/file', {
    file: {
      ...data
    },
    subtask_id: id
  })
}

export async function uploadFile(formData) {
  return await axios.post(
    `https://ufs.udevs.io/v1/file/${process.env.NEXT_PUBLIC_PROJECT_FOLDER_ID}`,
    formData,
    {
      headers: {
        'Content-Type': 'mulpipart/form-data'
      }
    }
  )
}
