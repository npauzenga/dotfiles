set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set runtimepath+=~/.vim/bundle/Vundle.vim
" config for CRTL P
set runtimepath^=~/.vim/bundle/ctrlp.vim

""""""
" Status Line
"""""
" show relative path
set statusline+=%f
" show column and row numbers
set statusline+=%10((%l,%c)%)
" show git branch via fugitive
set statusline+=%=%{fugitive#statusline()}

""""""
" Plugins
"""""
call vundle#begin()
  Plugin 'valloric/YouCompleteMe'
  Plugin 'tpope/vim-rails'
  Plugin 'ctrlpvim/ctrlp.vim'
  Plugin 'tpope/vim-sensible'
  Plugin 'tpope/vim-fugitive'
  Plugin 'thoughtbot/vim-rspec'
  Plugin 'VundleVim/Vundle.vim'
  Plugin 'garbas/vim-snipmate'
  Plugin 'MarcWeber/vim-addon-mw-utils'
  Plugin 'tomtom/tlib_vim'
  Plugin 'honza/vim-snippets'
  Plugin 'tpope/vim-commentary'
call vundle#end()

filetype plugin indent on

" When started as "evim", evim.vim will already have done these settings.
if v:progname =~? "evim"
  finish
endif

" allow backspacing over everything in insert mode
set backspace=indent,eol,start

if has("vms")
  set nobackup		" do not keep a backup file, use versions instead
else
  set backup		" keep a backup file
endif
set history=50		" keep 50 lines of command line history
set ruler		" show the cursor position all the time
set showcmd		" display incomplete commands
set incsearch		" do incremental searching

" Don't use Ex mode, use Q for formatting
map Q gq

" CTRL-U in insert mode deletes a lot.  Use CTRL-G u to first break undo,
" so that you can undo CTRL-U after inserting a line break.
inoremap <C-U> <C-G>u<C-U>

" In many terminal emulators the mouse works just fine, thus enable it.
if has('mouse')
  set mouse=a
endif

" Switch syntax highlighting on, when the terminal has colors
" Also switch on highlighting the last used search pattern.
if &t_Co > 2 || has("gui_running")
  syntax on
  set hlsearch
endif

" Only do this part when compiled with support for autocommands.
if has("autocmd")

  " Enable file type detection.
  " Use the default filetype settings, so that mail gets 'tw' set to 72,
  " 'cindent' is on in C files, etc.
  " Also load indent files, to automatically do language-dependent indenting.
  filetype plugin indent on

  " Put these in an autocmd group, so that we can delete them easily.
  augroup vimrcEx
  au!

  " For all text files set 'textwidth' to 78 characters.
  autocmd FileType text setlocal textwidth=78

  " When editing a file, always jump to the last known cursor position.
  " Don't do it when the position is invalid or when inside an event handler
  " (happens when dropping a file on gvim).
  " Also don't do it when the mark is in the first line, that is the default
  " position when opening a file.
  autocmd BufReadPost *
    \ if line("'\"") > 1 && line("'\"") <= line("$") |
    \   exe "normal! g`\"" |
    \ endif

  augroup END

else

  set autoindent		" always set autoindenting on

endif " has("autocmd")

" Convenient command to see the difference between the current buffer and the
" file it was loaded from, thus the changes you made.
" Only define it when not defined already.
if !exists(":DiffOrig")
  command DiffOrig vert new | set bt=nofile | r # | 0d_ | diffthis
		  \ | wincmd p | diffthis
endif

execute pathogen#infect()
syntax on
filetype plugin indent on

syntax enable
set background=dark
colorscheme solarized

" highlight column 80
set colorcolumn=80

" show numbers on left
set number
set relativenumber

" set autobackup dir, perhaps disabling is better
set backupdir=~/vimtmp,.
set directory=~/vimtmp,.

" Softtabs, 2 spaces
set tabstop=2
set shiftwidth=2
set shiftround
set expandtab

" Make CtrlP use ag for listing files.
let g:ctrlp_user_command = 'ag %s -l --hidden --nocolor -g ""'
let g:ctrlp_use_caching = 0

""""""
" Helper functions
"""""

" Removes trailing spaces
function! TrimWhiteSpace()
  %s/\s\+$//e
endfunction

""""""
" Mappings
"""""

" Remap 0 to first non-blank character in line
map 0 ^
inoremap jj <ESC>

let mapleader = ","

" paste automatically correct indentation
map <Leader>p :set paste<CR>o<esc>"*]p:set nopaste<cr>
map <Leader>h :nohlsearch<cr>

" RSpec.vim mappings
map <Leader>t :call RunCurrentSpecFile()<CR>
map <Leader>s :call RunNearestSpec()<CR>
map <Leader>l :call RunLastSpec()<CR>
map <Leader>a :call RunAllSpecs()<CR>

" map CTRL-S to save
command -nargs=0 -bar Update if &modified
                           \|    if empty(bufname('%'))
                           \|        browse confirm write
                           \|    else
                           \|        confirm write
                           \|    endif
                           \|endif
nnoremap <silent> <C-S> :<C-u>Update<CR>

" map TrimWhiteSpace to rts
nnoremap <silent> <Leader>rts :call TrimWhiteSpace()<CR>

" automatically remove white space on save
autocmd FileWritePre    * :call TrimWhiteSpace()
autocmd FileAppendPre   * :call TrimWhiteSpace()
autocmd FilterWritePre  * :call TrimWhiteSpace()
autocmd BufWritePre     * :call TrimWhiteSpace()
