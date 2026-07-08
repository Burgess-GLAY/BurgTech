import { Router } from 'express'
import { listProjects, getProject, createProject, updateProject, deleteProject } from '../controllers/projectsController'
import { requireAuth, requireAdmin } from '../middleware/auth'
import { auditLog } from '../middleware/audit'

export const projectsRouter = Router()
projectsRouter.get('/', listProjects)
projectsRouter.get('/:slug', getProject)
projectsRouter.post('/', requireAuth, requireAdmin, auditLog('Project'), createProject)
projectsRouter.put('/:id', requireAuth, requireAdmin, auditLog('Project'), updateProject)
projectsRouter.delete('/:id', requireAuth, requireAdmin, auditLog('Project'), deleteProject)
