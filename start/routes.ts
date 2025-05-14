/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const MoveNotesController = () => import('#notes/controllers/move_notes_controller')

const CreateNotesController = () => import('#notes/controllers/create_notes_controller')
const GetNotesController = () => import('#notes/controllers/get_notes_controller')
const RegistersController = () => import('#auth/controllers/register_controller')
const LoginController = () => import('#auth/controllers/login_controller')

router
  .group(() => {
    router.post('/register', [RegistersController, 'execute'])
    router.post('/login', [LoginController, 'execute'])
  })
  .prefix('/auth')

router
  .group(() => {
    router.post('/', [CreateNotesController, 'execute'])
    router.post('/move', [MoveNotesController, 'execute'])
    router.get('/', [GetNotesController, 'execute'])
  })
  .prefix('/notes')
