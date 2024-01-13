

poly<-c()
poly_finie<-c()


lagrange_poly <- function (x){
    if (length(dataX)>=1){
        re<-0

        for (i in 1:length(dataX)){
            k<-dataY[i]
            for (j in 1:length(dataX)){
                # print(j)
                # print(k)
                if (i!=j){
                    k<-k*(x-dataX[j])/(dataX[i]-dataX[j])
                }
            }
            # print(k)
            re<-re+k
        }

        return(re)
        
    }
} 


set_data <- function (dataX,dataY){
    dataX<<-dataX
    dataY<<-dataY
}



calcPoly<- function (x){
    if (length(poly)>=1){
            y<-poly[1]
            if (length(poly)>1){
                for (i in 2:length(poly)){
                    k<-1;
                    for (j in 1:(i-1)){
                        k<-k*(x-dataX[j])
                    } 
                    y<-y+poly[i]*k
                }
            }
            return(y)
        }
}

calc_poly_finie<- function (x){
    if (length(poly_finie)>=1){
            y<-poly_finie[1]
            if (length(poly_finie)>1){
                for (i in 2:length(poly_finie)){
                    k<-1;
                    for (j in 1:(i-1)){
                        k<-k*(x-dataX[j])
                    } 
                    y<-y+poly_finie[i]*k
                }
            }
            return(y)
        }
}


difference_finieP2<- function (j,i){
    if (j==0){
        return (dataY[i])
    }else{
        return (difference_finieP2(j-1,i+1)-difference_finieP2(j-1,i))
    }
}

difference_finieP1 <- function (dataX,dataY,h){


    set_data(dataX,dataY)
    # if (length(poly_finie)==0){
    #     poly_finie<<-c(dataY[0])
    # }

    if (length(poly_finie)<length(dataX)){
        for (i in 1:(length(dataX)-length(poly_finie))){
            k<-length(poly_finie)
            r<-difference_finieP2(length(poly_finie),1)/((h^k)*factorial(k))
            poly_finie<<-c(poly_finie,r)
        }
    }
    
    return(poly_finie)
}

difference_diviseP2 <- function (i,j,dataX,dataY){

    if (i==j){
        return(dataY[i])
    }else {
       return((difference_diviseP2(i+1,j,dataX,dataY)-difference_diviseP2(i,j-1,dataX,dataY))/(dataX[j]-dataX[i]))
    }
}



difference_diviseP1 <- function (dataX,dataY){
    # poly<<-c(dataY[1])
    # if (length(dataX)>=2){
    # dataX<<-dataX
    # dataY<<-dataY
    set_data(dataX,dataY)
    n<-length(poly)+1
    if (n<=length(dataX)){
        for (i in n:length(dataX)){
            poly<<-c(poly,difference_diviseP2(1,i,dataX,dataY))
        }
    }
    # }
    return(poly)
}


reset_poly <- function(){
    poly<<-c()
    poly_finie<<-c()
}


Simpson <- function(r,method=0){
    # print('hello')
    if (length(dataX)>=2){
        h<-(dataX[length(dataX)]-dataX[1])/r
        k<-0
        if (r>=2){
            for (i in 1:(r-1)){
                # print(i)
                if (method==1){
                    k<-k+calcPoly(dataX[1]+i*h)
                }else if (method==0){
                    k<-k+lagrange_poly(dataX[1]+i*h)
                }else if (method==2) {
                    k<-k+calc_poly_finie(dataX[1]+i*h)
                }
            }
        }
        k2<-0
        if (r>=1){
            for (i in 1:r){
                if (method==1){
                    k2<-k2+calcPoly(dataX[1]+(i-0.5)*h)
                }else if (method==0){
                    k2<-k2+lagrange_poly(dataX[1]+(i-0.5)*h)
                }else if (method==2) {
                    k2<-k2+calc_poly_finie(dataX[1]+(i-0.5)*h)
                }
            }
        }
        fa<-dataY[1]
        fb<-dataY[length(dataY)]
        # print((h/6)*(fa+2*k+4*k2+fb))
        # return((h/6)*(calcPoly(dataX[1])+2*k+4*k2+calcPoly(dataX[length(dataX)])))
        return((h/6)*(fa+2*k+4*k2+fb))

    }
    
}

Trapeze <- function(r,method){
    if (length(dataX)>=2){
        h <- (dataX[length(dataX)]-dataX[1])/r
        k <- 0
        if (r>=2){
            for (i in 1:(r-1)){
                if (method==1){
                    k<-k+calcPoly(dataX[1]+i*h)
                }else if (method==0){
                    k<-k+lagrange_poly(dataX[1]+i*h)
                }else if (method==2) {
                    k<-k+calc_poly_finie(dataX[1]+i*h)
                }
            }
        }

        fa<-dataY[1]
        fb<-dataY[length(dataY)]
        return((h/2)*(fa+fb+2*k))
    }
}




# print(difference_finieP1(c(0,1,2),c(1,2,4),1))
# # print(Simpson(1))
# print(Trapeze(1))