// 神舟21号载人飞船发射功能
$(document).ready(function() {
    let countdownValue = 10; // 倒计时初始值
    let countdownInterval;
    
    // 开始倒计时按钮点击事件
    $('#start-countdown').click(function() {
        startCountdown();
    });
    
    // 发射按钮点击事件
    $('#launch-button').click(function() {
        launchRocket();
    });
    
    // 开始倒计时函数
    function startCountdown() {
        // 隐藏开始按钮
        $('#start-countdown').addClass('hidden');
        
        // 显示倒计时数字并添加动画
        $('#countdown-display').text(countdownValue).addClass('countdown-animation');
        
        // 开始倒计时
        countdownInterval = setInterval(function() {
            countdownValue--;
            
            if (countdownValue > 0) {
                $('#countdown-display').text(countdownValue);
                
                // 最后3秒改变颜色和动画速度
                if (countdownValue <= 3) {
                    $('#countdown-display').css({
                        'color': '#ff5252',
                        'text-shadow': '0 0 30px rgba(255, 82, 82, 1)'
                    });
                    $('.countdown-animation').css('animation-duration', '0.5s');
                }
            } else {
                // 倒计时结束
                clearInterval(countdownInterval);
                $('#countdown-display').text('发射！').removeClass('countdown-animation');
                
                // 显示发射按钮
                setTimeout(function() {
                    $('#launch-button').addClass('launch-active');
                    $('#countdown-display').addClass('hidden');
                }, 1000);
            }
        }, 1000);
    }
    
    // 发射火箭函数
    function launchRocket() {
        // 禁用发射按钮防止重复点击
        $('#launch-button').prop('disabled', true).text('发射中...');
        
        // 创建火箭发射效果
        createLaunchEffect();
        
        // 模拟发射过程
        setTimeout(function() {
            // 显示成功信息
            $('body').html(`
                <div style="text-align: center; padding: 50px;">
                    <h1 style="color: #4caf50; font-size: 3rem; margin-bottom: 20px;">🚀 发射成功！</h1>
                    <p style="font-size: 1.5rem; margin-bottom: 30px;">神舟21号载人飞船已成功发射！</p>
                    <div style="font-size: 1.2rem; line-height: 1.6;">
                        <p>✓ 一级火箭分离完成</p>
                        <p>✓ 二级火箭点火成功</p>
                        <p>✓ 飞船进入预定轨道</p>
                        <p>✓ 太阳能帆板展开正常</p>
                    </div>
                    <button id="restart-button" style="margin-top: 40px; padding: 15px 40px; font-size: 1.2rem; background: #2196f3; color: white; border: none; border-radius: 25px; cursor: pointer;">重新发射</button>
                </div>
            `);
            
            // 重新发射按钮事件
            $('#restart-button').click(function() {
                location.reload();
            });
        }, 3000);
    }
    
    // 创建发射视觉效果
    function createLaunchEffect() {
        // 添加发射火焰效果
        const flame = $('<div>').css({
            position: 'fixed',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '200px',
            background: 'linear-gradient(to top, #ff9800, #ff5252, transparent)',
            borderRadius: '50% 50% 0 0',
            opacity: '0.8',
            zIndex: '1000',
            animation: 'flameAnimation 0.5s infinite alternate'
        }).appendTo('body');
        
        // 添加火焰动画
        $('<style>').text(`
            @keyframes flameAnimation {
                from { height: 200px; opacity: 0.8; }
                to { height: 300px; opacity: 0.6; }
            }
        `).appendTo('head');
        
        // 添加震动效果
        $('body').css('animation', 'shake 0.5s ease-in-out');
        $('<style>').text(`
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `).appendTo('head');
        
        // 3秒后移除效果
        setTimeout(function() {
            flame.remove();
            $('body').css('animation', '');
        }, 3000);
    }
    
    // 键盘快捷键支持
    $(document).keydown(function(e) {
        // 空格键开始倒计时
        if (e.keyCode === 32 && !$('#start-countdown').hasClass('hidden')) {
            e.preventDefault();
            startCountdown();
        }
        
        // Enter键发射（当发射按钮可见时）
        if (e.keyCode === 13 && $('#launch-button').is(':visible')) {
            e.preventDefault();
            launchRocket();
        }
    });
});

