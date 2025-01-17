import Collapse from '@/components/Collapse'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

/**
 * 折叠菜单
 * @param {*} param0
 * @returns
 */
export const MenuItemCollapse = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0
  const router = useRouter()

  const [isOpen, changeIsOpen] = useState(false)

  const toggleShow = () => {
    changeShow(!show)
  }

  const toggleOpenSubMenu = () => {
    changeIsOpen(!isOpen)
  }

  if (!link || !link.show) {
    return null
  }

  const selected = (router.pathname === link.to) || (router.asPath === link.to)

  return <>
        <div onClick={toggleShow} className={'py-2 px-5 duration-300 text-base justify-between hover:bg-indigo-700 hover:text-white hover:shadow-lg cursor-pointer font-light flex flex-nowrap items-center ' +
            (selected ? 'bg-indigo-500 text-white ' : ' text-black dark:text-white ')}>

            {!hasSubMenu && <Link href={link?.to}>
                <div className='my-auto items-center justify-between flex '>
                    <i className={`${link.icon} w-4 ml-3 mr-6 text-center`} />
                    <div >{link.name}</div>
                </div>
                {link.slot}
            </Link>}

            {hasSubMenu && <div onClick={hasSubMenu ? toggleOpenSubMenu : null} className='my-auto items-center w-full justify-between flex '>
                <div className=''>{link?.name}</div>
                <i className={`px-2 fas ${isOpen ? 'fa-chevron-down' : 'fa-chevron-left'}`}></i>
            </div>}
        </div>

        {/* 折叠子菜单 */}
        {hasSubMenu && <Collapse isOpen={isOpen}>
            {link.subMenus.map(sLink => {
              return <div key={sLink.id} className='cursor-pointer w-full font-extralight dark:bg-black text-left px-10 justify-start bg-gray-100  hover:bg-indigo-700 hover:text-white dark:hover:bg-gray-900 tracking-widest transition-all duration-200 border-b dark:border-gray-800 py-3 pr-6'>
                    <Link href={sLink.to}>
                        <span className='text-sm'>{sLink.title}</span>
                    </Link>
                </div>
            })}
        </Collapse>}
    </>
}
