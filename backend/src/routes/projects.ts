import { Router } from 'express'
import { listProjects, getProject, createProject, updateProject, deleteProject } from '../controllers/projectsController'
import { requireAuth, requireAdmin } from '../middleware/auth'

export const projectsRouter = Router()
projectsRouter.get('/',      listProjects)
projectsRouter.get('/:slug', getProject)
projectsRouter.post('/',     requireAuth, requireAdmin, createProject)
projectsRouter.put('/:id',   requireAuth, requireAdmin, updateProject)
projectsRouter.delete('/:id',requireAuth, requireAdmin, deleteProject)
