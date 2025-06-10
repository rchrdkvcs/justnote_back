/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const DeleteNoteController = () => import('#notes/controllers/delete_note_controller')
const OauthController = () => import('#auth/controllers/oauth_controller')
const UpdateNotesController = () => import('#notes/controllers/update_notes_controller')

const ShowNotesController = () => import('#notes/controllers/show_notes_controller')
const MoveNotesController = () => import('#notes/controllers/move_notes_controller')
const CreateNotesController = () => import('#notes/controllers/create_notes_controller')
const GetNotesController = () => import('#notes/controllers/get_notes_controller')
const RegistersController = () => import('#auth/controllers/register_controller')
const LoginController = () => import('#auth/controllers/login_controller')

router
  .group(() => {
    router.post('/register', [RegistersController, 'execute'])
    router.post('/login', [LoginController, 'execute'])

    router.get('/:provider', [OauthController, 'render'])
    router.get('/:provider/callback', [OauthController, 'execute'])
  })
  .prefix('/auth')

router
  .group(() => {
    router.post('/', [CreateNotesController, 'execute'])
    router.post('/move', [MoveNotesController, 'execute'])
    router.get('/', [GetNotesController, 'execute'])
    router.get('/:noteId', [ShowNotesController, 'execute'])
    router.put('/:noteId', [UpdateNotesController, 'execute'])
    router.delete('/:noteId', [DeleteNoteController, 'execute'])
  })
  .prefix('/notes')
