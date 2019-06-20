import { message } from 'ant-design-vue/es'

const colorList = [
  {
    name: '薄暮',
    value: '#F5222D'
  },
  {
    name: '火山',
    value: '#FA541C'
  },
  {
    name: '日暮',
    value: '#FAAD14'
  },
  {
    name: '明青',
    value: '#13C2C2'
  },
  {
    name: '极光绿',
    value: '#52C41A'
  },
  {
    name: '拂晓蓝（默认）',
    value: '#1890FF'
  },
  {
    name: '极客蓝',
    value: '#2F54EB'
  },
  {
    name: '酱紫',
    value: '#722ED1'
  }
]

const menuThemeList = [
  {
    name: '暗色菜单风格',
    value: 'dark',
    imgSrc:
      'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg'
  },
  {
    name: '亮色菜单风格',
    value: 'light',
    imgSrc:
      'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg'
  }
]

const layoutModeList = [
  {
    name: '侧边栏导航',
    value: 'side',
    imgSrc:
      'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg'
  },
  {
    name: '顶部栏导航',
    value: 'top',
    imgSrc:
      'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg'
  }
]

let lessNodesAppended
const updateTheme = color => {
  // Don't compile less in production!
  /* if (process.env.NODE_ENV === 'production') {
    return;
  } */
  // Determine if the component is remounted
  if (!color) {
    return
  }
  const hideMessage = message.loading('正在编译主题！', 0)

  function buildIt () {
    if (!window.less) {
      return
    }
    setTimeout(() => {
      window.less
        .modifyVars({
          '@primary-color': color
        })
        .then(() => {
          hideMessage()
        })
        .catch(() => {
          message.error('更新主题色失败')
          hideMessage()
        })
    }, 200)
  }

  if (!lessNodesAppended) {
    // insert less.js and color.less
    const lessStyleNode = document.createElement('link')
    const lessConfigNode = document.createElement('script')
    const lessScriptNode = document.createElement('script')
    lessStyleNode.setAttribute('rel', 'stylesheet/less')
    lessStyleNode.setAttribute('href', '/color.less')
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `
    lessScriptNode.src =
      'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js'
    lessScriptNode.async = true
    lessScriptNode.onload = () => {
      buildIt()
      lessScriptNode.onload = null
    }
    document.body.appendChild(lessStyleNode)
    document.body.appendChild(lessConfigNode)
    document.body.appendChild(lessScriptNode)
    lessNodesAppended = true
  } else {
    buildIt()
  }
}

const updateColorWeak = colorWeak => {
  // document.body.className = colorWeak ? 'colorWeak' : '';
  colorWeak
    ? document.body.classList.add('color-weak')
    : document.body.classList.remove('color-weak')
}

export {
  menuThemeList,
  colorList,
  layoutModeList,
  updateTheme,
  updateColorWeak
}
